"use client";
import { getAgreementTypes } from "../../components/agreementTypesList";
import Button from "../../components/button";
import Datepicker from "../../components/datepicker";
import { getExecutionStatuses } from "../../components/executionStatuses";
import { getCompanies } from "../../components/companiesList";
import { getExpiryActions } from "../../components/expiryActionsList";
import ListBox from "../../components/listBox";
import { getPartyTypes } from "../../components/partyTypesList";
import TextField from "../../components/textField";
import { ArrowLeftIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import moment from "moment-timezone";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UploadFile from "../../components/uploadFile";
import MultipleSelect from "../../components/multipleSelect";
import { getCollaborators } from "../../components/collaborators";

const url = process.env.NEXT_PUBLIC_BKEND_URL;

export default function NewUser() {
  let router = useRouter();
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [saving, setSaving] = useState(false);
  let [organizations, setOrganizations] = useState(null);
  let [companies, setCompanies] = useState([]);
  let [userCompany, setUserCompany] = useState({
    name: "Select",
    value: "",
  });

  useEffect(() => {
    setSaving(false);

    console.log(JSON.parse(localStorage.getItem("user")));

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
  }, []);

  function saveUserData() {
    fetch(`${url}/users/signup`, {
      method: "POST",
      headers: {
        // Authorization: "Basic " + `${baseAuth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: {
          phone,
        },
        organizations: [userCompany?.key],
        permissions: {},
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setSaving(false);
        router.push("/users");
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
          href="/users"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <div className="text-xs">All Users</div>
        </Link>
        <div className="ml-3 flex flex-col space-y-5 ">
          <div className="grid md:grid-cols-5 sm:grid-cols-2 gap-10 ">
            <TextField
              label="First Name"
              onChange={(e) => setFirstName(e)}
              id="1"
              // placeholder="What dou you want to call the file?"
            />
            <TextField label="Last Name" onChange={(e) => setLastName(e)} />
            <TextField label="Email" onChange={(e) => setEmail(e)} />
            <TextField label="Phone" onChange={(e) => setPhone(e)} />

            <div className="z-10">
              <ListBox
                label="Company"
                selected={userCompany}
                setSelected={setUserCompany}
                options={companies}
              />
            </div>
          </div>

          <Button onClick={saveUserData} isDisabled={saving} loading={saving}>
            Save User
          </Button>
        </div>
      </div>
    </>
  );
}
