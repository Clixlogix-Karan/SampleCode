import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import InputAdornment from "@mui/material/InputAdornment";
import LanguageIcon from "@mui/icons-material/Language";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import styles from "../../styles/components/profile/profile.module.scss";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Alert, Input } from "@mui/material";
import validator from 'validator'
import { Box } from "@mui/system";
import { useSelector,useDispatch } from "react-redux";
import { userGetData,userSaveData } from '../../redux/profile-settings/user-profile.actions'
import { useAuth } from "../../contexts/auth.context";
import AWS from 'aws-sdk'
import AlertBox from '../../components/layout/Modal'

const ProfileSettings = () => {
    const { user,updateUser } = useAuth()
    const dispatch = useDispatch()
    const [profile, setProfile] = useState('')
    const [banner, setBanner] = useState('')
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState({ activeStep: 0, error: false, errorMessage: {} });
    const [progress , setProgress] = useState(0);
    const [isAlert,setAlert] = React.useState("")
    AWS.config.update({
        accessKeyId: 'AKIA22UH35GJZH4BHB74',
        secretAccessKey: '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'
    })
    const S3_BUCKET = 'nft-paltform'
    const REGION ='us-west-1'
   
    useEffect(()=>{
        if(user?._id){
            dispatch(userGetData(user?._id))
        }
    },[])
    const data2 = useSelector((state)=>state?.profileReducer)
    console.log("updated",data2?.updated)

    React.useEffect(()=>{
        if(data2?.updated==true){
            setAlert("Profile updated successfully!")
        }
    },[data2?.updated])
        
    const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET},
        region: REGION,
    })
    
    const initialState = {
        username: user?.name?user?.name:'',
        bio: user?.about?user?.about:'', 
        email: user?.email?user?.email:'', 
        link_instagram:user?.socialLink?.instagram?user?.socialLink?.instagram:'',
        link_website:user?.socialLink?.youtube?data2?.socialLink?.youtube:'',
        link_twitter:user?.socialLink?.twitter?user?.socialLink?.twitter:'', 
        walletAddress: user?.walletAddress,
        bannerFile: user?.profilePic ? user?.profilePic : '',
        profileFile: user.profileBanner ? user.profileBanner : '',
        profileImage:user?.profilePic?user?.profilePic:'',
        bannerImage:user?.profileBanner?user?.profileBanner:''
    }

    const [state, setState] = useState(initialState)

    const handleInputChange = (e) => {
        setState((s)=>({...s,[e.target.name]:e.target.value}))
    }

    useEffect(()=>{
        if(data2){
            setState({
                username: user?.name ? user?.name:'',
                bio: user?.about ? user?.about:'', 
                email: user?.email ? user?.email:'', 
                link_instagram:user?.socialLink?.instagram ? user?.socialLink?.instagram:'',
                link_website:user?.socialLink?.youtube ? user?.socialLink?.youtube:'',
                link_twitter:user?.socialLink?.twitter ? user?.socialLink?.twitter:'', 
                walletAddress: user?.walletAddress,
                bannerFile: user?.profileBanner && user.profileBanner,
                profileFile: user?.profilePic && user?.profilePic,
                profileImage:user?.profilePic ? user?.profilePic:'',
                bannerImage:user?.profileBanner ? user?.profileBanner:''
            })
        }
    },[user])

    const hiddenFileInput = useRef(null);

    const handleClickInput = (event) => {
        hiddenFileInput.current.click();
    }

    const handleValidation = (e) => {
        e.preventDefault()
        //field Validation
        let error = false;
        if (!state.walletAddress) {
            error = true;
            setError({
                ...isError,
                error: true,
                errorMessage: { ...isError.errorMessage, walletAddress: "Please add user bio" }
            })
        }
        if (!state.username) {
            error = true;
            setError({
                ...isError,
                error: true,
                errorMessage: { ...isError.errorMessage, username: "Username can't be empty" }
            })
        } 
        if (!state.bio) {
            error = true;
            setError({
                ...isError,
                error: true,
                errorMessage: { ...isError.errorMessage, bio: "Please add user bio" }
            })
        }
        if (!state.email) {
            error = true;
            setError({
                ...isError,
                error: true,
                errorMessage: { ...isError.errorMessage, email: "Please add a collection" }
            })
        }
        if (!error) {
            //add else if for validating other fields (if any)
            setError({
                activeStep: isError.activeStep + 1,
                error: false,
                errorMessage: {}
            });
            //calling mint NFt if field validation are done.
            saveData()
        } else {
            setError({
                ...isError,
                error: true,
                errorMessage: { ...isError.errorMessage, validationError: "Please fix the error in fields above and try again" }
            })
            console.log(isError)
            return
        }
    }

    const saveData = ()=>{
        // console.table('submitted',state)
        setLoading(true)
        let req = {
            "userId": user?._id,
            "name": state?.username,
            "about": state?.bio,
            "email": state?.email,
            "profilePic": state?.profileFile,
            "profileBanner": state?.bannerFile,
            "socialLink": {
              "twitter": state?.link_twitter?state?.link_twitter:"",
              "instagram": state?.link_instagram?state?.link_instagram:"",
              "youtube": state?.link_website?state?.link_website:""
            },
            walletAddress:user?.walletAddress
          }
        //   setAlert("Profile updated successfully!")
        dispatch(userSaveData(req)).then(res=>[
              setLoading(false)
          ])
         
          if(req){
              let oldData = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{}
            updateUser({...oldData,...req})
          }
    }

    const copyToClipBoard=()=>{
        navigator.clipboard.writeText(user?.walletAddress);
        setAlert('Copied address ' + '"' + user?.walletAddress + '"' + ' to clipboard')
    }
 
    const onProfileChange = async (e, type) => {
        setLoading(true)
        const file = e.target.files[0]
        type === 'profile' ?  setState({...state, profileFile: file}) : setState({...state, bannerFile: file});
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            type === 'profile' ?  setProfile(e.target.result) : setBanner(e.target.result);
        }
        fileReader.readAsDataURL(file);
        uploadToS3(file, type)
    }
    const uploadToS3=(file, type)=>{
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name,
            // ContentType: 'image/png'
        };

        myBucket.putObject(params)
            // .on('httpUploadProgress', (evt) => {
                // setProgress(Math.round((evt.loaded / evt.total) * 100))
            // })
            .promise()
            .then(res=>{
                console.log(res)
                const imageUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`
                type === 'profile' ?  setState({...state , profileFile : imageUrl }) : setState({...state, bannerFile: imageUrl});
                setLoading(false)
            })
            // .send((err) => {
            //     if (err) console.log(err)
            // })
            // console.log(`https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`);

    }

    return (
        <div className="profile-panel-wrp">
          {isAlert?<AlertBox textMessage={isAlert} onClose={()=>{setAlert("")}}/>:null}
            <div className="main-heading">
                <h2>Profile Settings</h2>
            </div>
            <Box
            component="form"
            onSubmit={handleValidation}
            noValidate
            autoComplete="off"
            >
            <div className={styles.profilpanelContainer}>
                <div className={styles.settingTopRow}>
                    <div className={styles.profileChnageBox}>
                        <h3>
                            Profile Image <InfoOutlinedIcon />
                        </h3>

                        <figure>
                            {/* <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChangeInput}
                  accept="image/*"
                  style={{ display: "none"}}
                />

                <IconButton
                  onClick={handleClickInput}
                  size="xx-small"
                  pos="absolute"
                  zIndex="10"
                  left="5px"
                  bottom="5px"
                  aria-label="file upload "
                  icon={<CloudUploadIcon />}
                /> */}
                           {( profile || state.profileFile)?<img src={(profile || state.profileFile)} />:null} 
                        </figure>
                        <div className={styles.logoUploadBox} style={{marginTop:20}}>
                                <label htmlFor="contained-button-file-profile">
                                    <Input
                                        accept="image/*"
                                        id="contained-button-file-profile"
                                        multiple
                                        type="file"
                                        name="profile"
                                        style={{display:'none'}}
                                        ref={hiddenFileInput}
                                        onChange={(e)=>onProfileChange(e, 'profile')}
                                    />
                                    <Button variant="contained" component="span">
                                        { (state.profileFile || profile) ? 'Change' : 'Choose'} File
                                    </Button>
                                </label>
                            </div>
                    </div>
                    <div className={styles.brdrVertical}></div>
                    <div className={styles.bannerUploadBox}>
                        <h3>
                            Profile Banner <InfoOutlinedIcon />
                        </h3>
                        <figure>
                            {(banner || state.bannerFile)?<img src={(banner || state.bannerFile )} />:null}
                        </figure>
                        <div className={styles.logoUploadBox} style={{marginTop:20}}>
                                <label htmlFor="contained-button-file-banner">
                                    <Input
                                        accept="image/*"
                                        id="contained-button-file-banner"
                                        multiple
                                        type="file"
                                        name="banner"
                                        style={{display:'none'}}
                                        ref={hiddenFileInput}
                                        onChange={(e)=>onProfileChange(e, 'banner')}
                                    />
                                    <Button variant="contained" component="span">
                                        { (banner || state.bannerFile )? 'Change' : 'Choose'} File
                                    </Button>
                                </label>
                            </div>
                    </div>
                </div>
            </div>
            <div className={styles.settingsOptions}>
                <div className="setting-options-wrp">
                    <div class="main-heading mb-40">
                        <p class="subHeading textBlue">*Required fields</p>
                    </div>
                    <div className="nft-row mb-40">
                        <div className="nft-col-12">
                            <div className="inputwrp">
                                <label className="inputLabel">
                                    Username<span>*</span>
                                </label>

                                <TextField
                                    fullWidth
                                    size="small"
                                    inputProps={{maxlength:100}}
                                    id="standard-bare"
                                    variant="outlined"
                                    value={state?.username}
                                    name="username"
                                    placeholder="Enter username"
                                    onChange={handleInputChange}
                                    error={isError.error && !state.username}
                                    helperText={
                                        (!state.username && isError.error) && "Username Can't be Empty"
                                    }
                                />

                                {/* <TextField
                    helperText="Please enter your name"
                    id="demo-helper-text-misaligned"
                    label="Enter username"
                  /> */}
                            </div>
                        </div>
                    </div>
                    <div className="nft-row mb-40">
                        <div className="nft-col-12">
                            <div className="inputwrp">
                                <label className="inputLabel">
                                    Bio<span>*</span>
                                </label>

                                <div className="disfield">
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        name="bio"
                                        size="small"
                                        maxLength={300}
                                        value={state?.bio}
                                        onChange={handleInputChange}
                                        placeholder="Tell the world your story!"
                                        error={isError.error && !state.bio}
                                        helperText={
                                            (!state.bio && isError.error) && "Please add a user bio"
                                        }
                                    />
                                    <p className="helptext">(300) Max characters only.</p>  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nft-row mb-40">
                        <div className="nft-col-12">
                            <div className="inputwrp">
                                <label className="inputLabel">
                                    Email Address<span>*</span>
                                </label>

                                <TextField
                                    fullWidth
                                    type={'email'}
                                    name="email"
                                    size="small"
                                    value={state?.email}
                                    inputProps={{maxlength:70}}
                                    onChange={handleInputChange}
                                    id="standard-bare"
                                    variant="outlined"
                                    placeholder="Enter email"
                                    error={isError.error && !state.email}
                                    helperText={
                                        (!state.email && isError.error) && "Email can't be emtpy"
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="nft-row ">
                        <div className="nft-col-12">
                            <label className="inputLabel">Links</label>
                        </div>
                    </div>
                    <div className="nft-row  mb-40">
                        <div className="nft-col-4 nft-col-sm-12">
                            <div className="inputwrp">
                                <TextField
                                    fullWidth
                                    id="standard-bare"
                                    size="small"
                                    name='link_twitter'
                                    variant="outlined"
                                    placeholder="YourTwitterHandle"
                                    onChange={handleInputChange}
                                    value={state?.link_twitter}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <TwitterIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </div>
                        <div className="nft-col-4 nft-col-sm-12">
                            <div className="inputwrp">
                                <TextField
                                    fullWidth
                                    id="standard-bare"
                                    size="small"
                                    variant="outlined"
                                    name='link_instagram'
                                    placeholder="YourInstagramHandle"
                                    value={state?.link_instagram}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <InstagramIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </div>
                        <div className="nft-col-4 nft-col-sm-12">
                            <div className="inputwrp">
                                <TextField
                                    fullWidth
                                    id="standard-bare"
                                    variant="outlined"
                                    size="small"
                                    name='link_website'
                                    placeholder="Youtube link here"
                                    onChange={handleInputChange}
                                    value={state?.link_website}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LanguageIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="nft-row mb-40">
                        <div className="nft-col-12">
                            <div className="inputwrp copyAddress">
                                <label className="inputLabel">Wallet Address</label>

                                <div className="copyAdrsrow">
                                    <TextField
                                        fullWidth
                                        id="standard-bare"
                                        variant="outlined"
                                        size="small"
                                        name='walletAddress'
                                        helperText={!state.walletAddress && "Wallet Address can't be null"}
                                        error={!state.walletAddress}
                                        disabled={true}
                                        onChange={handleInputChange}
                                        value={state.walletAddress}
                                    />
                                    <Button class="copybtnAdrs" onClick={()=>copyToClipBoard()}>
                                        <ContentCopyIcon />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nft-row">
                        <div className="nft-col-12">
                            {
                                isError.error && <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">
                                    <h3>Oops, validation errors </h3>
                                    <p>{isError.errorMessage.validationError}</p></Alert>
                                </Stack>
                            }
                            <div className="setting-save-wrp text-center">
                                <Button type={'submit'} className="themeBg apply" disabled={isLoading}>Save</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Box>
        </div>
    )

    // const isError = ()=>{
    //     let flag = false
    //     Object.keys(state).map((key)=>{
    //         if(errors[key]){
    //           flag = true
    //           return
    //         }
    //     })
    //     return flag
    // }


    // const validation = (field)=>{
    //     if(field?.username==undefined && validator?.isEmpty(field?.username+'')){
    //         setErrors((s)=>({...s,username:'Username is required!'}))
    //     }else{
    //         setErrors((s)=>({...s,username:''}))
    //     }

    //     if(field?.walledAddress==undefined && validator?.isEmpty(field?.walledAddress+'')){
    //         setErrors((s)=>({...s,walledAddress:'Walled address is required!'}))
    //     }else{
    //         setErrors((s)=>({...s,walledAddress:''}))
    //     }
    //     if(field?.bio==undefined && validator?.isEmpty(field?.bio+'')){
    //         setErrors((s)=>({...s,bio:'Bio is required!'}))
    //     }else{
    //         setErrors((s)=>({...s,bio:''}))
    //     }

    //     if(field?.email==undefined && validator?.isEmpty(field?.email+'')){
    //         setErrors((s)=>({...s,email:'Email is required!'}))
    //     }else if(!validator?.isEmail(field?.email)){
    //         setErrors((s)=>({...s,email:'Email invalid'}))
    //     }else{
    //         setErrors((s)=>({...s,email:''}))
    //     }
    // }
}

export default ProfileSettings