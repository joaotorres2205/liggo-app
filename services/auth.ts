import { getSupabaseServer } from '@/lib/supabase-server';
import { comparePassword, hashPassword } from '@/lib/hash';
import { signToken } from '@/lib/jwt';
import { sendOtpEmail } from '@/lib/email';
import { normalizePhoneNumber } from '@/lib/phone';

export async function sendOtp(contact: string, via: 'email' | 'whatsapp' = 'email', name?: string) {
  const normalizedName = name?.trim() || null;
  let normalizedContact = via === 'email' ? contact.toLowerCase().trim() : contact.trim();
  let phoneValue = via === 'whatsapp' ? normalizedContact : null;

  if (via === 'whatsapp') {
    const normalizedPhone = normalizePhoneNumber(normalizedContact);
    if (!normalizedPhone) {
      throw new Error('WhatsApp inválido. Use +55DDD999999999 ou formato internacional válido.');
    }
    normalizedContact = normalizedPhone;
    phoneValue = normalizedPhone;
  }

  const emailValue = via === 'email'
    ? normalizedContact
    : `whatsapp+${normalizedContact.replace(/\D/g, '')}@liggo.app`;

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const otpHash = await hashPassword(code);
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  const supabase = getSupabaseServer() as any;
  const query = via === 'email' ? { email: emailValue } : { phone: phoneValue };

  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('id,email,phone,name')
    .match(query)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw new Error(fetchError.message);
  }

  let userId = existingUser?.id;

  if (!existingUser) {
    const { data: insertedUser, error: insertError } = await supabase
      .from('users')
      .insert({
        email: emailValue,
        phone: phoneValue,
        name: normalizedName,
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (insertError) throw new Error(insertError.message);
    userId = insertedUser?.id;
  }

  const updateData: any = {
    otp_code_hash: otpHash,
    otp_expires: otpExpires,
    updated_at: new Date().toISOString(),
  };

  if (normalizedName) updateData.name = normalizedName;
  if (phoneValue) updateData.phone = phoneValue;
  updateData.email = emailValue;

  const { error: updateError } = await supabase.from('users').update(updateData).eq('id', userId);
  if (updateError) throw new Error(updateError.message);

  let debug: string | undefined;

  if (via === 'email') {
    const emailResult = await sendOtpEmail(emailValue, code);
    if (!emailResult.success) {
      throw new Error(emailResult.message || 'Falha ao enviar o código por e-mail');
    }
    debug = emailResult.debug;
  }

  return { code, contact: normalizedContact, debug };
}

export async function verifyOtp(contact: string, code: string, via: 'email' | 'whatsapp' = 'email') {
  let normalizedContact = via === 'email' ? contact.toLowerCase().trim() : contact.trim();
  if (via === 'whatsapp') {
    const normalizedPhone = normalizePhoneNumber(normalizedContact);
    if (!normalizedPhone) {
      throw new Error('WhatsApp inválido. Use +55DDD999999999 ou formato internacional válido.');
    }
    normalizedContact = normalizedPhone;
  }
  const supabase = getSupabaseServer() as any;
  const query = via === 'email' ? { email: normalizedContact } : { phone: normalizedContact };

  const { data: user, error } = await supabase
    .from('users')
    .select('id,email,phone,otp_code_hash,otp_expires,name')
    .match(query)
    .single();

  if (error || !user) throw new Error('User not found');
  if (!user.otp_code_hash || !user.otp_expires) throw new Error('OTP not found');
  if (new Date(user.otp_expires).getTime() < Date.now()) throw new Error('OTP expired');

  const isValid = await comparePassword(code, user.otp_code_hash);
  if (!isValid) throw new Error('Invalid code');

  const { error: clearError } = await supabase
    .from('users')
    .update({ otp_code_hash: null, otp_expires: null, updated_at: new Date().toISOString() })
    .eq('id', user.id);
  if (clearError) throw new Error(clearError.message);

  const token = signToken({ sub: user.id, email: user.email, phone: user.phone });
  return { token, contact: contact, userId: user.id, name: user.name };
}

export async function setPassword(contact: string, via: 'email' | 'whatsapp' = 'email', password: string) {
  let normalizedContact = via === 'email' ? contact.toLowerCase().trim() : contact.trim();
  if (via === 'whatsapp') {
    const normalizedPhone = normalizePhoneNumber(normalizedContact);
    if (!normalizedPhone) {
      throw new Error('WhatsApp inválido. Use +55DDD999999999 ou formato internacional válido.');
    }
    normalizedContact = normalizedPhone;
  }
  const passwordHash = await hashPassword(password);
  const supabase = getSupabaseServer() as any;
  const query = via === 'email' ? { email: normalizedContact } : { phone: normalizedContact };

  const { error } = await supabase
    .from('users')
    .update({ password_hash: passwordHash, updated_at: new Date().toISOString() })
    .match(query);

  if (error) throw new Error(error.message);
  return true;
}

export async function loginWithPassword(email: string, password: string) {
  const normalizedEmail = email.toLowerCase().trim();
  const supabase = getSupabaseServer() as any;
  const { data: user, error } = await supabase
    .from('users')
    .select('id,email,password_hash')
    .eq('email', normalizedEmail)
    .single();

  if (error || !user || !user.password_hash) {
    throw new Error('Invalid login credentials');
  }

  const isValid = await comparePassword(password, user.password_hash);
  if (!isValid) throw new Error('Invalid login credentials');

  const token = signToken({ sub: user.id, email: user.email });
  return { token, userId: user.id, email: user.email };
}
