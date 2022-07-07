import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import styles from "../../../styles/components/createCollection/createCollection.module.scss";
import { Alert, CircularProgress, Paper, Stack } from "@mui/material";
import TextFieldComponent from "../../inputs/textField/TextField.component";
import TextAreaComponent from "../../inputs/textField/TextArea.component";
import ChooseTypeInput from './ChooseTypeInput'
import ProgressBar from "../../progressBar/Circular";

const Input = styled("input")({
    display: "none",
});

function CreateCollectionTop({ formInput, isProgress, setFormInput, onFileChange, isError, isLoading, handleStep }) {

    const collectionInputs = [
        { label: "Name - Ex. Treasures of the Sea*", kei: "collectionName", helpText: "Name can't be empty" },
        { label: "Token Symbol*", kei: "collectionSymbol", helpText: "Symbol can't be empty" },
        { label: "URL", kei: "collectionUrl", helpText: "URL can't be empty" },
    ]

    console.log("isProgress", isProgress)

    const fileButton = {
        width: '140px !important',
        height: '40px !important',
        background: '#ffffff !important',
        fontFamily: "Gordita !important",
        borderRadius: 500,
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: '-0.04em',
        color: '#9146ff',
        textTransform: 'inherit'
    }

    const removeBtn = {
        display: 'block',
        marginLeft: 'auto',
    padding: '5px 6px 0px',
    color: 'white',
    fontSize: 18,
    height: 35,
    borderRadius: 50,
    cursor:'pointer'
}

const clearImage=(e,name)=>{
    e.preventDefault();
    setFormInput((s)=>({...s,[name]:null}))
}

const FileBoxLogo = ({ data, label, name, id }) => (
    <div className={styles.fileupload} style={{ marginBottom: 20 }}>
        <Stack direction="row" className="uploadItemFile">
            {
                <Item style={{ width: '100%' }}>
                    
                    <label
                        className="fileContainer"
                        style={data ? { height: 300 } : {}}
                    >
                        {(data && isProgress[name] == 0) && <span className="fa fa-close" onClick={(e)=>clearImage(e,name)} style={removeBtn}></span>}
                    
                        {
                            (data && isProgress[name] == 0) ? (
                                <div  htmlFor={id}>
                                    <h3 style={{ color: 'white' }}>Preview {label}</h3>
                                    <div class="nft-preview-file">
                                        {(data) && <img src={data} alt="nft-file" style={{ maxWidth: "389px", maxHeight: '230px', zIndex: 0 }} />}
                                        <Input
                                            name={name}
                                            accept="image/*"
                                            id={id}
                                            multiple={false}
                                            type="file"
                                            onChange={onFileChange}
                                        />
                                    </div>
                                </div>
                            ) : isProgress[name] > 0 ? <ProgressBar value={isProgress[name]} /> : null
                        }
                    </label>
                </Item>
            }
        </Stack>
    </div>
)

return (
    <div className="stepRowMain">
        <div className={styles.stepItem}>
            <div className="d-flex justify-content-center">
                <div className="main-heading mb-40">
                    <div className="chooseTypeMain">
                        <h2>Create a Collection</h2>
                        <h5 className="required-fields" style={{ textAlign: 'center' }}>*Required fields</h5>
                    </div>
                </div>
            </div>
            <div className={styles.createItemHeader}>
                <div className="main-heading" style={{ color: '#fff' }}>
                    <p><strong>Choose Type</strong></p>
                    <ChooseTypeInput />
                </div>
            </div>
            {
                collectionInputs.map((item, i) => (
                    <div className={styles.inputWrp + ' ' + 'inputWrp'} key={'collectionInputs' + i}>
                        <div className="theme-input">
                            <TextFieldComponent
                                label={item.label}
                                formInput={formInput}
                                kei={item.kei}
                                onChange={setFormInput}
                                isError={isError}
                                helpText={item.helpText}
                            />
                        </div>
                    </div>
                ))
            }
            <div className={styles.inputWrp + ' ' + 'inputWrp'}>
                <div className="">
                    <TextAreaComponent
                        label="Description"
                        InputProps={{
                            style: {
                                color: "#c846ff"
                            }
                        }}
                        kei="description"
                        formInput={formInput}
                        onChange={setFormInput}
                        helpText={'Description cant be empty'}
                        isError={isError}
                    />
                </div>
            </div>
            <div className="uploadMainBox">
                {
                    formInput?.logo ? <FileBoxLogo data={formInput?.logo} label={"logo"} name={"logo"} id={"logo-file"} /> : <div className="logoUploadCollection top">
                        <div className={styles.logoRow}>


                            <div className={styles.logoImgContentBox}>
                                <div className={styles.row}>
                                    <div className={styles.icon}>
                                        <img src="/images/upload.png" />
                                    </div>
                                    <div className={styles.textAboutLogo}>
                                        <h3>
                                            Logo Image<span>*</span>
                                        </h3>
                                        <p>
                                            This image will also be used for navigation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div style={fileButton}>
                                <label htmlFor="logo-file">

                                    <Input
                                        id="contained-button-file"
                                        type="file"
                                        accept="image/*"
                                        onChange={onFileChange}
                                    />
                                    <Input
                                        name="logo"
                                        accept="image/*"
                                        id="logo-file"
                                        multiple={false}
                                        type="file"
                                        onChange={onFileChange}
                                    />
                                    <Button variant="contained" component="span">
                                        Choose File
                                    </Button>
                                    {isError.error && !formInput['logo'] && <p className="helptext" style={{ color: 'red' }}>* Logo image can't be empty!</p>}
                                </label>
                            </div>
                        </div>
                    </div>
                }


                <div className={styles.featurlogoRow}>
                    {formInput?.featuredImage ? <FileBoxLogo data={formInput?.featuredImage} label={"featured image"} name={"featuredImage"} id={"featuredImage-file"} /> : <div className={styles.uploadImgBox}>
                        <div className={styles.middle}>
                            <div className="d-flex justify-content-between">
                                <div className={styles.icon}>
                                    <img src="/images/upload.png" />
                                </div>
                                <div className={styles.uploadBtnBox}>
                                    <label htmlFor="featuredImage-file">
                                        <Input
                                            name="featuredImage"
                                            accept="image/*"
                                            id="featuredImage-file"
                                            multiple={false}
                                            type="file"
                                            onChange={onFileChange}
                                        />

                                        <Button variant="contained" component="span">
                                            Choose File
                                        </Button>
                                        {isError.error && !formInput['featuredImage'] && <p style={{ color: 'red' }} className="helptext">* Featured image can't be empty!</p>}

                                    </label>
                                </div>
                            </div>
                            <div className={styles.textAboutLogo}>
                                <h3>
                                    Featured Image<span>*</span>
                                </h3>
                                <p>
                                    This image will be used for featuring your
                                    collection on the homepage, category pages, or
                                    other promotion areas as polygon NFTs.
                                </p>
                            </div>
                        </div>
                    </div>}

                    {
                        formInput?.bannerImage ? <FileBoxLogo data={formInput?.bannerImage} label={"banner image"} name={"bannerImage"} id={"bannerImage-file"} /> : <div className={styles.uploadImgBox}>
                            <div className={styles.middle}>
                                <div className="d-flex justify-content-between">
                                    <div className={styles.icon}>
                                        <img src="/images/upload.png" />
                                    </div>
                                    <div className={styles.uploadBtnBox}>
                                        <label htmlFor="bannerImage-file">
                                            <Input
                                                name="bannerImage"
                                                accept="image/*"
                                                id="bannerImage-file"
                                                multiple={false}
                                                type="file"
                                                onChange={onFileChange}
                                            />
                                            <Button variant="contained" component="span">
                                                Choose File
                                            </Button>
                                            {isError.error && !formInput['bannerImage'] && <p style={{ color: 'red' }} className="helptext">* Banner image can't be empty</p>}

                                        </label>
                                    </div>
                                </div>
                                <div className={styles.textAboutLogo}>
                                    <h3>
                                        Banner Image<span>*</span>
                                    </h3>
                                    <p>
                                        This image will appear at the top of your
                                        collection page. Avoid including too much text in
                                        this banner image, as the dimensions chage on
                                        different device.
                                    </p>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
            {/*{
                    isError.error && <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">
                            <h3>Oops, validation errors </h3>
                            <p>{isError.errorMessage.validationError}</p></Alert>
                    </Stack>
                }*/}
            {/*<div className="themeBtn text-center mt-60 actionContainer">
                    <Button className="themeBg apply actionLoader" onClick={() => handleStep()}>Next</Button>
                    {
                        isLoading &&
                        <CircularProgress />
                    }
                </div>*/}
        </div>
    </div>
)
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'inherit',
}));

export default CreateCollectionTop