'use client'
import useInput from "@/app/hooks/useInput"
import { useState } from "react"

const Login = () => {
    const userid = useInput('')
    const password = useInput('')

    const handleSubmit = (e) => {
        e.preventDefault();

        if(userid.value && password.value) {
            userPosts();
        }
    }

    //const resp = await fetch(`${process.env.API_URL}/api/`);
    //const aboutus = await resp.json();
    //const story = aboutus.data;
    const userPosts = () => {
        const userData = {
            userid: userid.value,
            password: password.value,
        };
        fetch(`${process.env.API_URL}/api/auth/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Registration successful', data);
        })
        .catch(error => {
            console.error('Error during registration', error);
        });
    }

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