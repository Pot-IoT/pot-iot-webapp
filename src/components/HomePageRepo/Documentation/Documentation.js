import React from "react";
import { Divider } from "../Divider/Divider";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import {
  docAdd,
  docConnect,
  docEdit,
  docCommand,
  docDownload,
} from "./DocData";
import DocSection from "./DocSection";
import "./Documentation.css";

function Documentation() {
  return (
    <div className="home">
        <Navbar />
        <div className="doc-page-root">
        <div className="doc-top-section" id="doc-top-section">
            <h3 class="heading color-black">PoI-Iot Platform Documentation</h3>
            <div class="text-top color-black">
            {" "}
            With this instruction, you will be guided by sections, steps, and
            findally connect to the Platform and enjoy how easy it is. If there is
            something hard to understand, do not hesitate to contact us via Email:
            contact_us@pot-iot.com.
            </div>
        </div>
        <Divider
            text="PoT-IoT"
            margin="30px"
            color="#276afb"
            lineColor="#276afb"
        />
        <div className="doc-body">
            <DocSection {...docAdd} />
            <DocSection {...docConnect} />
            <DocSection {...docEdit} />
            <DocSection {...docCommand} />
            <DocSection {...docDownload} />
        </div>
        </div>
        <Footer />
    </div>
  );
}

export default Documentation;
