import {sign} from 'jsonwebtoken';

const getToken = async (id: string | number) => {
  return sign({ id }, process.env.JWT_PRIVATE_KEY as string, {
    expiresIn: '30d',
  });
};

export default getToken;
