import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';


//TO GET CURRENT ID

const Form = ({ currentId, setCurrentId }) => {

    const [postData, setPostData] = useState ({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useNavigate();


  //  useEffect(() => {
   //     if(post) setPostData(post);
   // }, [post]);

    useEffect(() => {
        if (!post?.title) clear();
        if (post) setPostData(post);
      }, [post]);

    //this ensures that after update of posts, inputs are reset.
    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    //if theres a selected id, dispatch createpost, otherwise dispatch update post.

        if(currentId === 0) { 
            dispatch(createPost({ ...postData, name: user?.result?.name }, history ));
            clear();  
        } else{     
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();   
        }    
    };


    //tihs states that you cannot create a post if u are not logged in
    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create a post and like other posts.
                </Typography>
            </Paper>
        );
    }


 return (
    <Paper className={classes.paper} elevation={6}>
     <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Edit' : 'Create' } a Socially</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
        <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
        <TextField name="tags" variant="outlined" label="Tags (coma seperated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}/> </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
       
     
     </form>

    </Paper>
    );
}

export default Form;