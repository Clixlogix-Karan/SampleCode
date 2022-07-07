import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import styles from "../../styles/components/getToken/gettoken.module.scss";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function GettokenComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className="blueBgPage pool-bg">
        <div className="top-space-header">
          <div className="customContainer">
            <div className="getTokenMain">
              <div className="getTokenTabs">
                <Box>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    TabIndicatorProps={{
                      style: {
                        display: "none",
                      },
                    }}
                  >
                    <Tab label="Pool" {...a11yProps(0)} className="tabBtn" />
                    <Tab label="Farm" {...a11yProps(1)} className="tabBtn" />
                  </Tabs>
                </Box>
              </div>
              <div className="getTokenPanelWrp">
                <Box>
                  <TabPanel value={value} index={0}>
                    <div className="getTokenHeading">
                      <h3>
                        Provide Liquidity <span>Join our Pools.</span>
                      </h3>
                      <div className="btnTop">
                        <Button>Buy ETH</Button>
                      </div>
                      <span className="overlaybtn"></span>
                    </div>
                    <div className="getTokenMainRow d-flex ">
                      <div className="getTokenbg">
                        <div className="getTokenRowTop">
                          <div className="tokenLeft">
                            <div className="d-flex">
                              <div className="icon d-flex">
                                <figure>
                                  <img src="/images/token-icon.png" />
                                </figure>
                                <span>TOKEN</span>
                              </div>
                              <div className="icon d-flex">
                                <figure>
                                  <img src="/images/ETH--icon.png" />
                                </figure>
                                <span>ETH</span>
                              </div>
                            </div>
                          </div>
                          <div className="tokenRight">
                            <div className="tokenAddress">
                              <span>0xc2c8...84C6</span>
                              <a>
                                <img src="/images/link_icon.png" />
                              </a>
                            </div>
                            <div className="iconLink">
                              <Button>
                                <img src="/images/Refresh.svg" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="getTokenRowMiddle">
                          <ul>
                            <li>
                              <span>Liquidity</span>
                              <label>
                                $14,413<span>.69</span>
                              </label>
                            </li>
                            <li>
                              <span>Volume(24)</span>
                              <label>
                                $5,237<span>.75</span>
                              </label>
                            </li>

                            <li>
                              <span>Fees (24h)</span>
                              <label>
                                $15<span>.71</span>
                              </label>
                            </li>

                            <li>
                              <span>APR</span>
                              <label>
                                37<span>.13%</span>
                              </label>
                            </li>
                          </ul>
                        </div>
                        <div className="getTokenRowBtm threeBox">
                          <div className="bxBtm one">
                            <div className="equal-height">
                              <h5>Pool Tokens</h5>
                              <h4>
                                0.00<span>USD</span>
                              </h4>
                              <p>Your pool share 0%</p>
                              <div className="btnbtm">
                                <Button>0.00 ETH-TOKEN</Button>
                              </div>
                            </div>
                          </div>
                          <div className="bxBtm">
                            <div className="equal-height">
                              <div className="no-value">
                                <span>0.00</span>
                              </div>
                              <div className="bxBtmHeading">
                                <h2>Pooled ETH</h2>
                              </div>
                            </div>
                          </div>

                          <div className="bxBtm">
                            <div className="equal-height">
                              <div className="no-value">
                                <span>0.00</span>
                              </div>
                              <div className="bxBtmHeading">
                                <h2>Pooled TOKEN</h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="getTokenbg">
                        <div className="getTokenRowTop d-flex">
                          <div className="tokenLeft">
                            <div className="btns d-flex">
                              <div className="addBtn">
                                <Button>Add</Button>
                              </div>
                              <div className="removeBtn">
                                <Button>Remove</Button>
                              </div>
                            </div>
                          </div>
                          <div className="tokenRight d-flex">
                            <div className="tokenAddress">
                              <span>View on SushiSwap</span>
                              <a>
                                <img src="/images/eyeIcon.png" />
                              </a>
                            </div>
                            <div className="iconLink fltrBtn">
                              <Button
                                id="fade-button"
                                aria-controls={open ? "fade-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                              >
                                <img src="/images/IconFilter.png" />
                              </Button>
                              <div>
                                <Menu
                                  id="fade-menu"
                                  className="filterSettingMain"
                                  MenuListProps={{
                                    "aria-labelledby": "fade-button",
                                  }}
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleClose}
                                  TransitionComponent={Fade}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                  }}
                                >
                                  <div className="filterSetting">
                                    <h3>Settings</h3>
                                    <ul>
                                      <li>
                                        <label>Slippage Tolerance</label>
                                        <div className="sliptol-row">
                                          <div className="slipToler">0.1%</div>
                                          <div className="slipToler selected">
                                            0.5%
                                          </div>
                                          <div className="slipToler">0.1%</div>
                                        </div>
                                      </li>
                                      <li>
                                        <label>Transaction deadline</label>
                                        <div className="deadlineWrp">
                                          <strong>60</strong>
                                          <span>mins</span>
                                        </div>
                                      </li>
                                    </ul>
                                    <div className="btnSave">
                                      <Button className="theme-btn">
                                        Save
                                      </Button>
                                    </div>
                                  </div>
                                </Menu>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="getTokenRowBtmAdd">
                          <div className="addTokenRow">
                            <div className="addTokenLeft">
                              <h4>Remove</h4>
                              <p>
                                0<span>.00</span>
                              </p>
                            </div>
                            <div className="addTokenRight">
                              <div className="addTokenBlance d-flex">
                                <span className="blance">Balance : --</span>
                                <span className="blanceType">ETH/TOKEN</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="reciveTokenRow">
                          <p>You will Receive (ETH & TOKEN)</p>
                        </div>
                        <div className="recivePriceRow">
                          <div className="pricebx">
                            <span>Price</span>
                          </div>
                          <div className="tokenPriceBx d-flex">
                            <span>1x TOKEN = 0 ETH</span>
                            <span>1x ETH = 0 TOKEN</span>
                          </div>
                        </div>
                        <div className="btnConnectWallet">
                          <Button>Connect Wallet</Button>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div className="getTokenHeading">
                      <h3>
                        $ETH Farm
                        <span>Stack your ETH-TOKEN to farm $ETH!</span>
                      </h3>
                      <div className="btnTop">
                        <Button>Get ETH/TOKEN</Button>
                      </div>
                      <span className="overlaybtn"></span>
                    </div>
                    <div className="getTokenMainRow d-flex ">
                      <div className="getTokenbg">
                        <div className="getTokenRowTop">
                          <div className="tokenLeft">
                            <div className="d-flex">
                              <div className="icon d-flex">
                                <figure>
                                  <img src="/images/token-icon.png" />
                                </figure>
                                <span>TOKEN</span>
                              </div>
                              <div className="icon d-flex">
                                <figure>
                                  <img src="/images/ETH--icon.png" />
                                </figure>
                                <span>ETH</span>
                              </div>
                            </div>
                          </div>
                          <div className="tokenRight">
                            <div className="tokenAddress">
                              <span>0xc2c8...84C6</span>
                              <a>
                                <img src="/images/link_icon.png" />
                              </a>
                            </div>
                            <div className="iconLink">
                              <Button>
                                <img src="/images/Refresh.svg" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="getTokenRowMiddle">
                          <ul>
                            <li>
                              <span>Liquidity</span>
                              <label>
                                $14,413<span>.69</span>
                              </label>
                            </li>

                            <li>
                              <span>APR</span>
                              <label>
                                240<span>.70%</span>
                              </label>
                            </li>

                            <li>
                              <span>Rewards</span>
                              <label>32.6k ETH / day</label>
                            </li>
                          </ul>
                        </div>
                        <div className="getTokenRowBtm threeBox">
                          <div className="bxBtm one">
                            <div className="equal-height">
                              <h5>My staked tokens</h5>
                              <h4>
                                0.00<span>USD</span>
                              </h4>
                              <p>Your pool share 0%</p>
                              <div className="btnbtm">
                                <Button>0.00 ETH-TOKEN</Button>
                              </div>
                            </div>
                          </div>
                          <div className="bxBtm">
                            <div className="equal-height">
                              <div className="pendingRewards">
                                <h5>Pending Rewards</h5>
                                <h4>
                                  0.00<span>ETH</span>
                                </h4>
                                <div className="btnbtm">
                                  <Button>HARVEST</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="getTokenbg">
                        <div className="getTokenRowTop d-flex">
                          <div className="tokenLeft">
                            <div className="btns d-flex">
                              <div className="addBtn">
                                <Button>Stack</Button>
                              </div>
                              <div className="removeBtn unstack">
                                <Button>Unstack</Button>
                              </div>
                            </div>
                          </div>
                          <div className="tokenRight d-flex">
                            <div className="tokenAddress">
                              <span>View on SushiSwap</span>
                              <a>
                                <img src="/images/eyeIcon.png" />
                              </a>
                            </div>
                            <div className="iconLink fltrBtn">
                              <Button
                                id="fade-button"
                                aria-controls={open ? "fade-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                              >
                                <img src="/images/IconFilter.png" />
                              </Button>
                              <div>
                                <Menu
                                  id="fade-menu"
                                  className="filterSettingMain"
                                  MenuListProps={{
                                    "aria-labelledby": "fade-button",
                                  }}
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleClose}
                                  TransitionComponent={Fade}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                  }}
                                >
                                  <div className="filterSetting">
                                    <h3>Settings</h3>
                                    <ul>
                                      <li>
                                        <label>Slippage Tolerance</label>
                                        <div className="sliptol-row">
                                          <div className="slipToler">0.1%</div>
                                          <div className="slipToler selected">
                                            0.5%
                                          </div>
                                          <div className="slipToler">0.1%</div>
                                        </div>
                                      </li>
                                      <li>
                                        <label>Transaction deadline</label>
                                        <div className="deadlineWrp">
                                          <strong>60</strong>
                                          <span>mins</span>
                                        </div>
                                      </li>
                                    </ul>
                                    <div className="btnSave">
                                      <Button className="theme-btn">
                                        Save
                                      </Button>
                                    </div>
                                  </div>
                                </Menu>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="getTokenRowBtmAdd">
                          <div className="addTokenRow">
                            <div className="addTokenLeft">
                              <h4>Unstack</h4>
                              <p>
                                0<span>.00</span>
                              </p>
                            </div>
                            <div className="addTokenRight">
                              <div className="addTokenBlance d-flex">
                                <span className="blance">Balance : --</span>
                                <span className="blanceType">ETH/TOKEN</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="reciveTokenRow">
                          <p>You will Receive (ETH & TOKEN)</p>
                        </div>
                        <div className="recivePriceRow">
                          <div className="pricebx">
                            <span>Price</span>
                          </div>
                          <div className="tokenPriceBx d-flex">
                            <span>1x TOKEN = 0 ETH</span>
                            <span>1x ETH = 0 TOKEN</span>
                          </div>
                        </div> */}
                        <div className="btnConnectWallet">
                          <Button>Connect Wallet</Button>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
