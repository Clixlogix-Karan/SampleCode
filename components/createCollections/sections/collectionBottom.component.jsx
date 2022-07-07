import * as React from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";

import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import styles from "../../../styles/components/createCollection/createCollection.module.scss";
import InputAdornment from "@mui/material/InputAdornment";
import { ArrowBack } from "@material-ui/icons";
import { fetchNetwork, switchNetwork } from "../../../utils/network-switch";
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Stack } from "@mui/material";

export default function CreateCollectionBottom({validate, handleStep,isError, deployCollection, isLoading, setNetwork, network, categoryList, setCategoryId}) {
    const [personName, setPersonName] = React.useState([]);
    const [category, setCategory] = React.useState('');
    // const [network, setNetwork] = React.useState('0x4');
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const names = ["ETH", "MATIC"];

    // React.useEffect(async() => {
    //     const chainId = await fetchNetwork();
    //     console.log(chainId)
    //     if(chainId === '0x4'){
    //         setNetwork('0x4')
    //     }else if(chainId === '0x13881'){
    //         setNetwork('0x13881')
    //     }
    // }, [])

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const theme = useTheme()

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value.split(",") : value );
  };

    const handleNetworkChange = async(value) => {
        const chain = await switchNetwork(value)
        setNetwork(chain)
    }

    return (
        <div className="stepRowMain">
            <div className={styles.stepItem}>
                {/*<div className="d-flex">
                    <div className="main-heading ">
                        <div className="chooseTypeMain">
                            <h2> <ArrowBack onClick={() => handleStep('back')} style={{cursor: 'pointer'}} /> ADD SEO</h2>
                            <h5 className="required-fields">*Required fields</h5>
                        </div>
                    </div>
                </div>*/}
               {/* <div className={styles.categoryWrp}>
                    <div className={styles.categoryWrpBg}>
                        <div className="d-flex  justify-content-between align-items-center sm-block w-100">
                            <div className={styles.heading}>
                                <h4>Category</h4>
                                <p>
                                    Adding a categories will help make your item
                                    discoverable on Polygon NFTs.
                                </p>
                            </div>
                            <div className={styles.addCategoryBox}>
                                <Button>Add Categories</Button>
                            </div>
                        </div>
                    </div>
                </div>*/}
                <div className="selectWrp">
                   {/* <label className="inputLabel">Category <span>*</span></label>
                    <p className="inputSugg">
                        <div className="info">
                            This is the category where your item will appear.
                        </div>
                    </p>*/}
                    <FormControl  fullWidth>
                    {/*<InputLabel style={{color:'white'}} id="Category">Category *</InputLabel>*/}
                    <Select
                        displayEmpty
                        value={category}
                        onChange={handleCategoryChange}                        
                        input={<FilledInput  color='secondary' />}
                        renderValue={(selected) => {
                        if (!selected) {
                            return (
                            <span className="placeholder-select">
                                Select category
                            </span>
                            );
                        }

                        return selected.join(", ");
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                    >
                        <MenuItem disabled value="">
                        <span className="placeholder-select">
                            Select Category
                        </span>
                        </MenuItem>
                        {categoryList?.map((obj, i) => (
                        <MenuItem
                            key={obj.name + i}
                            value={obj.name}
                            style={getStyles(name, personName, theme)}
                            onClick={() => setCategoryId(obj._id)}
                        >
                            {obj.name}
                        </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                </div>
                <div className={styles.categoryWrpInput}>
                    <div className="categoryInputsWrp">
                        <div className={styles.categoryRoW}>
                            <div className="nft-row ">
                                <div className="nft-col-12">
                                    <div className="wrp-input-top">
                                        <label className="inputLabel"> Links</label>
                                    </div>
                                </div>
                            </div>
                            <div className="nft-row mb-20">
                                <div className="nft-col-4 nft-col-sm-12">
                                    <div className={styles.inputWrp}>
                                        <div className="theme-input">
                                            <TextField
                                                fullWidth
                                                placeholder="Popwonderworld.io"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <img src="/images/pop-wonder.png" />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="nft-col-4 nft-col-sm-12">
                                    <div className={styles.inputWrp}>
                                        <div className="theme-input">
                                            <TextField
                                                fullWidth
                                                placeholder="https://discord/popwonderworld"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <img src="/images/discord.png" />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="nft-col-4 nft-col-sm-12">
                                    <div className={styles.inputWrp}>
                                        <div className="theme-input">
                                            <TextField
                                                fullWidth
                                                placeholder="https://instagram/popwworld"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <img src="/images/instagram.png" />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nft-row ">
                                <div className="nft-col-4 nft-col-sm-12">
                                    <div className={styles.inputWrp}>
                                        <div className="theme-input">
                                            <TextField
                                                fullWidth
                                                placeholder="https://www.medium.com/popwonder.."
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <img src="/images/medium.png" />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="nft-col-4 nft-col-sm-12">
                                    <div className={styles.inputWrp}>
                                        <div className="theme-input">
                                            <TextField
                                                fullWidth
                                                placeholder="https://t.me/popwonderworld"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <img src="/images/telegram.png" />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.categoryRoW}>
                            <div className="nft-row ">
                                <div className="nft-col-12">
                                    <div className="d-flex justify-content-between">
                                        <div className={styles.inputHeading}>
                                            <div className="wrp-input-top">
                                                <label className="inputLabel"> Blockchain</label>
                                                <p className="inputSugg">
                                                    Select the blockchain where you’d like new
                                                    item from this collection to be added by
                                                    default.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.infoIcon}>
                                            <InfoOutlinedIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nft-row ">
                                <div className="nft-col-6 nft-col-sm-6" onClick={()=>handleNetworkChange('0x4')}>
                                    <div className="blockChainOption">
                                        <div className={styles.bgBlock}>
                                            <div className="d-flex justify-content-between">
                                                <div className={styles.left}>
                                                    <span>
                                                        <img src="/images/ETH.png" />
                                                    </span>
                                                    <h6>ETH</h6>
                                                </div>
                                                <div className={styles.right}>
                                                    <div className="customCheckbox">
                                                        <input
                                                            type="radio"
                                                            id="test4"
                                                            name="radio-group"
                                                            checked={network === '0x4' ? true: false}
                                                            onClick={e => handleNetworkChange('0x4')}
                                                        />
                                                        <label htmlFor="test4"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="nft-col-6 nft-col-sm-6" onClick={()=>handleNetworkChange('0x13881')}>
                                    <div className="blockChainOption">
                                        <div className={styles.bgBlock}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className={styles.left}>
                                                    <span>
                                                        <img src="/images/WETHI.png" />
                                                    </span>
                                                    <h6>Polygon</h6>
                                                </div>
                                                <div className={styles.right}>
                                                    <div className="customCheckbox">
                                                        <input
                                                            type="radio"
                                                            id="test3"
                                                            name="radio-group"
                                                            checked={network === '0x13881' ? true: false}
                                                            onClick={e => handleNetworkChange('0x13881')}
                                                        />
                                                        <label htmlFor="test3"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className={styles.categoryRoW}>
                            <div className="nft-row ">
                                <div className="nft-col-12">
                                    <div className="d-flex justify-content-between">
                                        <div className={styles.inputHeading}>
                                            <div className="wrp-input-top">
                                                <label className="inputLabel">
                                                    {" "}
                                                    Payment Tokens
                                                </label>
                                                <p className="inputSugg">
                                                    These tokens can be used to buy and sell
                                                    your items.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.infoIcon}>
                                            <InfoOutlinedIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nft-row ">
                                <div className="nft-col-6 nft-col-sm-12">
                                    <div className="blockChainOption">
                                        <div className="d-flex justify-content-between">
                                            <div className={styles.ethBg}>
                                                <div className={styles.tokenIcn}>
                                                    <span>
                                                        <img src="/images/ETH1.png" />
                                                    </span>
                                                    <h6>
                                                        ETH/<span> Ethereum</span>
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className={styles.wethBg}>
                                                <div className={styles.tokenIcn}>
                                                    <span>
                                                        <img src="/images/WETH1.png" />
                                                    </span>
                                                    <h6>
                                                        WETH/<span> Ethereum</span>
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="nft-col-6 nft-col-sm-12">
                                    <div className="tokenselect">
                                        <div className="theme-select">
                                            <FormControl fullWidth>
                                                <Select
                                                    displayEmpty
                                                    value={personName}
                                                    onChange={handleChange}
                                                    input={<FilledInput />}
                                                    renderValue={(selected) => {
                                                        if (selected.length === 0) {
                                                            return (
                                                                <span className="placeholder-select">
                                                                    Add Token
                                                                </span>
                                                            );
                                                        }

                                                        return selected.join(", ");
                                                    }}
                                                    MenuProps={MenuProps}
                                                    inputProps={{
                                                        "aria-label": "Without label",
                                                    }}
                                                >
                                                    <MenuItem disabled value="">
                                                        <span className="placeholder-select">
                                                            Add Token
                                                        </span>
                                                    </MenuItem>
                                                    {names.map((name) => (
                                                        <MenuItem
                                                            key={name}
                                                            value={name}
                                                            style={getStyles(
                                                                name,
                                                                personName,
                                                                theme
                                                            )}
                                                        >
                                                            {name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                {
                    isError.error && <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">
                            <h3>Oops, validation errors </h3>
                            <p>{isError.errorMessage.validationError}</p></Alert>
                    </Stack>
                }
                <div className={styles.actionContainer}>
                    <Button className={styles.actionLoader} onClick={deployCollection} disabled={isLoading}>Create Now

                    </Button>
                    {
                    isLoading &&
                    <CircularProgress />
                    }
              </div>
            </div>
        </div>
    );
}
