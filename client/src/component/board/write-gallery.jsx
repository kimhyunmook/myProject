// import React, { useCallback,useState,useLayoutEffect } from 'react'
// import { useDropzone } from 'react-dropzone'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { galleryWriteBoard } from '../../actions/board_action'
// import { getDate } from '../../actions/tool_action'
// import { auth } from '../../actions/user_action'
// import Container from '../common/container'
// import { ListIcon, WriteIcon, Xmark } from '../common/fontawsome'

// function WriteGallery() {
//   const [user,setUser] = useState('');
//   const [gallery,setGallery] = useState('');
//   const [file,setFile] = useState('')
//   const [subject,setSubject] = useState('');
//   const [textarea,setTextarea] = useState('');
//   const navigate = useNavigate();
 
//   let fileList = [];
//   const dispatch = useDispatch();
//   const onDrop = useCallback((acceptedFiles) => {
//     acceptedFiles.forEach((file) => {
//       console.log(file)
//       setFile(file)
//     })
//   }, []);
//   const path = window.location.pathname.split('/');

//   const onSubjectHandler = (event) => {
//     setSubject(event.currentTarget.value)
//   }
//   const onTextareaHandler = (event) => {
//     setTextarea(event.currentTarget.value)
//   }

//   const {getRootProps, getInputProps} = useDropzone({onDrop});

//   useLayoutEffect(()=>{
//     auth({}).payload.then(res=>{
//       setUser(res);
//       console.log(res)
//     })
//   },[])
  
//   const onSubmit = (event) => {
//     event.preventDefault();
//     let body = new FormData();
//     body.append('file',file)
//     body.append('id',user.id)
//     body.append('time',getDate());
//     body.append('subject',subject)
//     body.append('content',textarea)
//     body.append('board_type','gallery')

//     let config = {
//       name:path[3]
//     }
//     dispatch(galleryWriteBoard(body,config))
//     .then(res=>{
//       console.log(res.payload)
//       navigate(`/board/${path[3]}/1`)
//     })
//   }

//   const moveList = (event) => {
//     event.preventDefault();
//     navigate(`/board/${path[3]}/1`)
//   }
//   return (
//     <Container>
//      <div className="baord board-write">
//         <form action="" method='post' onSubmit={ onSubmit }>
//           <ul>
//             <li {...getRootProps()} className="dropzone">
//                 <input {...getInputProps()} />
//                 <p>여기에 사진을 올려라</p>
//             </li>
//             <li>
//               <label htmlFor="subject">제목</label>
//               <input type="text" name="subject" value={subject} onChange={ onSubjectHandler }/>
//             </li>
//             <li>
//               <label htmlFor="content">내용</label>
//               <textarea name="content" value={textarea} id="" cols="30" rows="10" onChange={ onTextareaHandler }></textarea>
//             </li>
//           </ul>
          
//           <div className="btnArea">
//             <button className="button">
//               <WriteIcon />
//             </button>
//             <button className='button' onClick={moveList}>
//               <ListIcon />
//             </button>
//           </div>
//         </form>
//       </div>
//     </Container>
//   )
// };



// export default WriteGallery;