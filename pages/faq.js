import RootLayout from '../layout/root.layout';
import * as React from "react";
import styles from "../styles/components/faq/faq.module.scss";

import SwitchUnstyled, {
    switchUnstyledClasses,
} from "@mui/base/SwitchUnstyled";
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import faqStyles from '../styles/components/faq/faq.module.scss';
import { getFaq } from '../redux/faq/faq.actions';

export default function privacyPolicy() {
    const [expanded, setExpanded] = React.useState(false);
    const [faqs, setfaqs] = React.useState([])
    var faqDetails = useSelector(state => state.faqReducer)

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getFaq({ pageNo: 1, limit: 10 }))
    }, [])

    React.useEffect(() => {
        if (faqDetails.value) {
            setfaqs(faqDetails.value.data)
        }
    }, [faqDetails, faqDetails.value])

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


    return (
        <div>
            <RootLayout title='NFT PLATFORM' description='NFT Platform to create and sell NFTs'>
                <div className="blueBgPage">
                    <div className="top-space-header">
                        <div className="customContainer createItemMain">
                            <div className={styles.createItemHeader}>
                                <div className="main-heading mt-60">
                                    <h2>FAQs</h2>
                                </div>
                                <div className={styles.maincontent}>
                                    {/* <div dangerouslySetInnerHTML={ { __html: privacy_policy}} /> */}
                                    {faqs.map((x) => {
                                        return <div className={styles.faqContent}>
                                            <div className={styles.Question}>
                                                <h4> <div dangerouslySetInnerHTML={{ __html: x.question }} /></h4>
                                            </div>
                                            <div className={styles.Ans}>
                                                <p>
                                                    <div dangerouslySetInnerHTML={{ __html: x.answer }} />
                                                </p>
                                            </div> </div>
                                    })}
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </RootLayout>
        </div>
    )
}
