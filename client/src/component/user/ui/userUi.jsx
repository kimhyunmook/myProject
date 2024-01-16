export function RegisterUi (props) {
    return(
        <form onSubmit={props.submit} className='register'>
            <h2>
                {props.name}
            </h2>
            <ul className="register-ui">
                {props.children} 
            </ul>
            <div className="btnArea">
                <input type="submit" value={props.submitBtn}/>
                <input type="reset" value="취소" />
            </div>
        </form>
    )
}

export const Li = (props) => {
    return (
        <li className={ props.name }>
            <label>
                <span>
                    { props.name } 
                </span> 
            </label>
            <div className='insert-box'>
                { props.children }
            </div>
        </li>
    )
}

export const Gender = (props) => {
    return(
        <div className="gender-box">
            <label htmlFor={props.gender}>
                {props.children}
            </label>
            {
            props.checked !== undefined ? 
            <input checked type="radio" value={props.value} id={props.gender} name="gender" onChange={props.change} />
            :<input type="radio" value={props.value} id={props.gender} name="gender" onChange={props.change} /> 
            }
        </div>
    )
}
