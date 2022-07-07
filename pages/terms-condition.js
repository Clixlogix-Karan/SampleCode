
import RootLayout from '../layout/root.layout';
import * as React from "react";
import styles from "../styles/components/createItem/createitem.module.scss";

import SwitchUnstyled, {
  switchUnstyledClasses,
} from "@mui/base/SwitchUnstyled";
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { getTermsCondition } from '../redux/terms-conditions/terms-conditions.actions';

export default function privacyPolicy() {
    const [expanded, setExpanded] = React.useState(false);
    const [terms_condition, setTerms] = React.useState('')
    var termsConditonDetails = useSelector(state=> state.termsConditionReducer)
    
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getTermsCondition({name: "termsAndConditions"}))
    }, [])

    React.useEffect(() => {
        if(termsConditonDetails && termsConditonDetails.value){
            setTerms(termsConditonDetails.value.data.content)
        }
    }, [termsConditonDetails, termsConditonDetails.value])

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
                                    <h2>Terms & Conditions</h2>
                                </div>
                                <div className="main-content">
                                    <div className="terms-conditions-content" dangerouslySetInnerHTML={ { __html: terms_condition}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </RootLayout>
        </div>
    )
}
