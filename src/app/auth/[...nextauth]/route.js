import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

export default NextAuth({
  providers: [
    Providers.Credentials({
      // 이 부분은 자체 로그인 로직을 구현합니다.
      credentials: {
        userid: { label: 'userid', type: 'text' },
        password: {  label: 'password',  type: 'password' }
      },
      async authorize(credentials) {
        // 외부 서버와 통신하여 유저 정보와 토큰을 가져오는 로직을 여기에 구현합니다.
        const { userid, password } = credentials;

        // 외부 서버와의 통신을 통해 유저 정보와 토큰을 가져옵니다.
        const response = await axios.post(`${process.env.API_URL}/api/auth/local`, {
          userid,
          password
        });

        const data = response.data;

        if (data) {
          // 유저 정보와 토큰을 NextAuth.js 세션에 저장합니다.
          return {
            username: data.username,
            email: data.email,
            token: data.token
          };
        } else {
          // 로그인 실패 시 null을 반환합니다.
          return null;
        }
      }
    })
  ],
  callbacks: {
    async session(session, token) {
      // 세션에 토큰 정보를 추가합니다.
      session.token = token.token;
      return session;
    }
  },
  session: {
    jwt: true
  }
});