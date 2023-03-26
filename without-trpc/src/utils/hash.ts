import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, salt);
}

export async function verifyPassword(
  candidatePassword: string,
  candidateHash: string
) {
  return await bcrypt.compare(candidatePassword, candidateHash);
}
