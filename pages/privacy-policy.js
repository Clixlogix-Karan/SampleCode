
import RootLayout from '../layout/root.layout';
import * as React from "react";
import styles from "../styles/components/createItem/createitem.module.scss";

import SwitchUnstyled, {
  switchUnstyledClasses,
} from "@mui/base/SwitchUnstyled";
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { getPrivacyPolicy } from '../redux/privacy-policy/privacy-policy.actions';

export default function privacyPolicy() {
    const [expanded, setExpanded] = React.useState(false);
    const [privacy_policy, setPrivacyPolicy] = React.useState('')
    var privacyPolicyDetails = useSelector(state=> state.privacyPolicyReducer)
    
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getPrivacyPolicy({name: "privacyPolicy"}))
    }, [])

    React.useEffect(() => {
        if(privacyPolicyDetails.value){
            setPrivacyPolicy(privacyPolicyDetails.value.data.content)
        }
    }, [privacyPolicyDetails, privacyPolicyDetails.value])

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const theme = useTheme();

    const handleChange = (event) => {
    const {
        target: { value },
        } = event;
    setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
        );
    };
    const Input = styled("input")({
        display: "none",
    });

    return (
        <div>
            <RootLayout title='NFT PLATFORM' description='NFT Platform to create and sell NFTs'>
                <div className="blueBgPage">
                    <div className="top-space-header">
                        <div className="customContainer createItemMain">
                            <div className={styles.createItemHeader}>
                                <div className="main-heading text-center">
                                    <h2>Privacy policy</h2>
                                </div>
                                <div className="main-content" style={{color:'#ffffff'}}>
                                    <div dangerouslySetInnerHTML={ { __html: privacy_policy}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </RootLayout>
        </div>
    )
}
