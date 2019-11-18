import styled from 'styled-components';

export const StyledLogin = styled.div`
    .error {
        text-align: center;
        font-size: 1.7rem;
        color: #721c24;
        background-color: #f8d7da;
        border: 2px solid #f5c6cb;
        border-radius: 6px;
        padding: 12px 18px;
        margin-bottom: 0;
    }
    form {
        position: relative;
        z-index: 1;
        background: #FFFFFF;
        max-width: 360px;
        margin: 0 auto 100px;
        padding: 45px;
        text-align: center;

        input {
            outline: 0;
            background: #f2f2f2;
            width: 100%;
            border: 0;
            margin: 0 0 15px;
            padding: 15px;
            box-sizing: border-box;
            font-size: 14px;
        }

        button {
            text-transform: uppercase;
            outline: 0;
            background: #949eff;
            color: #FFF;
            box-shadow: 0 3px 15px rgba(200, 200, 200, 0.5);
            width: 100%;
            border: 0;
            border-radius: 4px;
            padding: 15px;
            color: #FFFFFF;
            font-size: 14px;
            -webkit-transition: all 0.3 ease;
            transition: all 0.3 ease;
            cursor: pointer;
            
            &:hover, 
            &:active, 
            &:focus {
                background: #3A49E0;
            }
        }

        .message {
            margin: 15px 0 0;
            color: #b3b3b3;
            font-size: 12px;

            a {
                color: #4CAF50;
                text-decoration: none;
            }
        }
    }
`;
