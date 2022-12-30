import { sign } from 'jsonwebtoken';

const getToken = (id: number | undefined, role: string) => {
  return sign({ user: id, role: role }, process.env.JWT_PRIVATE_KEY as string);
};

export default getToken;
