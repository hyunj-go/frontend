'use client'
import { signIn } from 'next-auth/react';
import useInput from "@/app/hooks/useInput"
import { useState } from "react"

const Login = () => {
    const userid = useInput('')
    const password = useInput('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(userid.value && password.value) {
            // signIn 함수를 사용하여 자체 로그인 요청을 보냅니다.
            const result = await signIn('credentials', {
            userid,
            password,
            // 필요한 경우 다른 필드도 추가할 수 있습니다.
            });
        }
    
        // 로그인이 성공하면 다음 페이지로 이동할 수 있습니다.
        if (result.error) {
          // 로그인 실패 시 오류 메시지를 처리할 수 있습니다.
          console.error(result.error);
        }
      };

    return(
        <div className="wrapper">
            <div className="input-form sm">
                <div className="container">
                    <div className="row">
                        <div className="columns twelve text">
                            <h2>Login</h2>
                            <p></p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} id="form_area" name="Login Form">
                        <div className="input-container full">
                            <input type="text" {...userid} placeholder="아이디를 입력해주세요"/>
                            {userid.value==='' && <div className="error-msg">아이디를 입력해주세요.</div>}
                        </div>
                        <div className="input-container full">
                            <input type="password" {...password} placeholder="비밀번호를 입력해주세요"/>
                            {!password.value && <div className="error-msg">비밀번호를 입력해주세요.</div>}
                        </div>
                        <button type="submit" id="submit">로그인</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login