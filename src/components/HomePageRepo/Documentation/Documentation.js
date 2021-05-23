import React from "react";
import { Divider } from "../Divider/Divider";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import {
  docAddAccount,
  docAdd,
  docConnect,
  docEdit,
  docCommand,
  docDownload,
  docGitHub,
} from "./DocData";
import DocSection from "./DocSection";
import "./Documentation.css";

function Documentation() {
  return (
    <div className="home">
        <Navbar />
        <div className="doc-page-root">
        <div className="doc-top-section" id="doc-top-section">
            <h3 class="heading color-black">Getting Start With POT-IOT</h3>
            <div class="text-top color-black">
            {" "}
            In this section we will walk through registering a IOT device on POT-IOT 
            platform and uploading sensor data to it using an IOT device (a Raspberry 
            Pi in this tutorial as example).<br></br> Having trouble connecting your 
            device ? Do not hesitate to contact us via Email:
            support@pot-iot.com.
            </div>
        </div>
        <Divider
            text="PoT-IoT Quick Start Guide"
            margin="30px"
            color="#276afb"
            lineColor="#276afb"
        />
        <div className="doc-body">
            <DocSection {...docAddAccount} />
            <DocSection {...docAdd} />
            <DocSection {...docConnect} />
            <DocSection {...docDownload} />
        </div>
        <Divider
            text="Find the full example on GitHub"
            margin="30px"
            color="#276afb"
            lineColor="#276afb"
        />
        <div className="doc-body">
            <DocSection {...docGitHub} />
        </div>
        </div>
        <Footer />
    </div>
  );
}

export default Documentation;
