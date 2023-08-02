"use client";
import { getAgreementTypes } from "../../../components/agreementTypesList";
import Button from "../../../components/button";
import Datepicker from "../../../components/datepicker";
import { getExecutionStatuses } from "../../../components/executionStatuses";
import { getCompanies } from "../../../components/companiesList";
import { getExpiryActions } from "../../../components/expiryActionsList";
import ListBox from "../../../components/listBox";
import { getPartyTypes } from "../../../components/partyTypesList";
import TextField from "../../../components/textField";
import { ArrowLeftIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import moment from "moment-timezone";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UploadFile from "../../../components/uploadFile";
import MultipleSelect from "../../../components/multipleSelect";
import { getCollaborators } from "../../../components/collaborators";

const url = process.env.NEXT_PUBLIC_BKEND_URL;

export default function NewFile() {
  let router = useRouter();
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [comments, setComments] = useState("");
  let [contractValue, setContractValue] = useState("");
  let [startDate, setStartDate] = useState(moment());
  let [endDate, setEndDate] = useState(moment());
  let [partyType, setPartyType] = useState({ name: "Select", value: "" });
  let [agreementType, setAgreementType] = useState({
    name: "Select",
    value: "",
  });
  let [statusOfExecution, setStatusOfExecution] = useState({
    name: "Select",
    value: "",
  });
  let [requiredAction, setRequiredAction] = useState({
    name: "Select",
    value: "",
  });
  let [partyTypeOptions, setPartyTypeOptions] = useState([]);
  let [agreementTypeOptions, setAgreementTypeOptions] = useState([]);
  let [executionStatusesOptions, setExecutionStatusesOptions] = useState([]);
  let [expiryActionsOptions, setExpiryActionsOptions] = useState([]);
  let [collaboratorsOptions, setCollaboratorsOptions] = useState([]);
  let [file, setFile] = useState(null);
  let [saving, setSaving] = useState(false);
  let [user, setUser] = useState("");
  let [collaborators, setCollaborators] = useState([]);
  let [organization, setOrganization] = useState(null);
  let [companies, setCompanies] = useState([]);
  let [fileCompany, setFileCompany] = useState({
    name: "Select",
    value: "",
  });

  useEffect(() => {
    setSaving(false);
    setFile(null);
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log("Ussserrrr", localStorage.getItem("user"));
    console.log("Ussserrrr Parsed", JSON.parse(localStorage.getItem("user")));
    getPartyTypes().then((res) => {
      let options = res?.map((pa) => {
        return {
          name: pa.description,
          value: pa._id,
          key: pa._id,
        };
      });

      setPartyTypeOptions(options);
    });

    getCompanies().then((res) => {
      let options = res?.map((comp) => {
        return {
          name: comp?.name,
          value: comp?._id,
          key: comp?._id,
        };
      });

      setCompanies(options);
    });

    getAgreementTypes().then((res) => {
      let options = res?.map((ag) => {
        return {
          name: ag.description,
          value: ag._id,
          key: ag._id,
        };
      });

      setAgreementTypeOptions(options);
    });

    getExecutionStatuses().then((res) => {
      let options = res?.map((ag) => {
        return {
          name: ag.description,
          value: ag._id,
          key: ag._id,
        };
      });

      setExecutionStatusesOptions(options);
    });

    getCollaborators().then((res) => {
      let collaborators = res?.users;
      let options = collaborators
        ?.map((collab) => {
          return {
            label: collab.email,
            value: collab._id,
            key: collab._id,
          };
        })
        .filter(
          (collab) =>
            collab.key !== JSON.parse(localStorage.getItem("user"))?._id
        );

      setCollaboratorsOptions(options);
    });

    getExpiryActions().then((res) => {
      let options = res?.map((ag) => {
        return {
          name: ag.description,
          value: ag._id,
          key: ag._id,
        };
      });

      setExpiryActionsOptions(options);
    });
  }, []);

  function submit() {
    uploadFile().then((res) => {
      saveFileData(`${url}/file/files/${res.filename}`);
    });
  }

  async function uploadFile() {
    setSaving(true);
    let formData = new FormData();
    formData.append("file", file[0]);

    return fetch(`${url}/uploads/`, {
      method: "POST",
      headers: {
        // Authorization: "Basic " + `${baseAuth}`,
        // "Content-Type": "application/json",
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        setSaving(false);
        throw new Error("Failes to upload file");
      }
    });
  }

  function saveFileData(filePath) {
    fetch(`${url}/filings/`, {
      method: "POST",
      headers: {
        // Authorization: "Basic " + `${baseAuth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        partyType: partyType?.value,
        agreementType: agreementType?.value,
        contractCommencement: startDate,
        contractExpiration: endDate,
        statusOfExecution: statusOfExecution?.value,
        contractValue,
        comments,
        actionOnExpiry: requiredAction?.value,
        docId: filePath,
        owner: user?._id,
        collaborators: [...collaborators, user?._id],
        organization: organization || user?.organizations[0]?._id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setSaving(false);
        router.push("/documents/files");
      })
      .catch((err) => {
        setSaving(false);
        console.log(err);
      });
  }

  return (
    <>
      {/* Form */}
      <div className="flex flex-col space-y-20 px-24">
        <Link
          className="flex flex-row items-center text-blue-500"
          href="/documents/files"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <div className="text-xs">All files</div>
        </Link>
        <div className="ml-3 flex flex-col space-y-5 ">
          <div className="grid md:grid-cols-5 sm:grid-cols-2 gap-10 ">
            <TextField
              label="Name"
              onChange={(e) => setName(e)}
              id="1"
              placeholder="What dou you want to call the file?"
            />
            <TextField
              label="Description"
              onChange={(e) => setDescription(e)}
            />
            <div className="z-10">
              <ListBox
                selected={partyType}
                setSelected={setPartyType}
                onChange={(e) => console.log(e)}
                label="Party type"
                options={partyTypeOptions}
              />
            </div>

            <div className="z-10">
              <ListBox
                label="File type"
                selected={agreementType}
                setSelected={setAgreementType}
                options={agreementTypeOptions}
              />
            </div>

            <div className="z-10">
              <ListBox
                label="Status of execution"
                selected={statusOfExecution}
                setSelected={setStatusOfExecution}
                options={executionStatusesOptions}
              />
            </div>

            <TextField
              label="Contract value (RWF)"
              type="number"
              onChange={(e) => setContractValue(e)}
            />
            <TextField label="Comments" onChange={(e) => setComments(e)} />
            <div className="z-0">
              <ListBox
                label="Required action (upon expiry)"
                selected={requiredAction}
                setSelected={setRequiredAction}
                options={expiryActionsOptions}
              />
            </div>

            <Datepicker setStartDate={setStartDate} setEndDate={setEndDate} />

            {/* <div className="z-0">
              <MultipleSelect
                options={collaboratorsOptions}
                setSelected={setCollaborators}
              />
            </div> */}
          </div>
          <div className="grid md:grid-cols-5 sm:grid-cols-2 gap-10 ">
            <UploadFile setFile={setFile} />

            {user &&
              user?.organizations[0]?.number === 1000 &&
              user?.permissions?.canViewFiles && (
                <div className="z-10">
                  <ListBox
                    label="Company"
                    selected={fileCompany}
                    setSelected={setFileCompany}
                    options={companies}
                  />
                </div>
              )}
          </div>
          <Button onClick={submit} isDisabled={saving || !file}>
            Save file
          </Button>
        </div>
      </div>
    </>
  );
}
