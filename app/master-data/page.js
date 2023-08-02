"use client";
import React, { useEffect, useState } from "react";
import UsersList from "../components/usersList";
import { getPartyTypes } from "../components/partyTypesList";
import { getCompanies } from "../components/companiesList";
import { getAgreementTypes } from "../components/agreementTypesList";
import { getExecutionStatuses } from "../components/executionStatuses";
import { getCollaborators } from "../components/collaborators";
import { getExpiryActions } from "../components/expiryActionsList";
import ListBox from "../components/listBox";
import TextField from "../components/textField";
import Button from "../components/button";
import * as lodash from "lodash";

const url = process.env.NEXT_PUBLIC_BKEND_URL;

export default function Documemts() {
  let [partyTypeOptions, setPartyTypeOptions] = useState([]);
  let [newPartyType, setNewPartyType] = useState("");
  let [savingPartyType, setSavingPartyType] = useState(false);
  let [agreementTypeOptions, setAgreementTypeOptions] = useState([]);
  let [savingAgreementType, setSavingAgreementType] = useState(false);
  let [newAgreementType, setNewAgreementType] = useState("");
  let [executionStatusesOptions, setExecutionStatusesOptions] = useState([]);
  let [savingStatusOfExecution, setSavingStatusOfExecution] = useState(false);
  let [newStatusOfExecution, setNewStatusOfExecution] = useState("");
  let [expiryActionsOptions, setExpiryActionsOptions] = useState([]);
  let [savingExpiryAction, setSavingExpiryAction] = useState(false);
  let [newExpiryActions, setNewExpiryActions] = useState("");
  let [companies, setCompanies] = useState([]);
  let [partyType, setPartyType] = useState({ name: "Show list", value: "" });
  let [agreementType, setAgreementType] = useState({
    name: "Show list",
    value: "",
  });
  let [statusOfExecution, setStatusOfExecution] = useState({
    name: "Show list",
    value: "",
  });
  let [requiredAction, setRequiredAction] = useState({
    name: "Show list",
    value: "",
  });

  useEffect(() => {
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

  function postPartyType() {
    setSavingPartyType(true);
    fetch(`${url}/partyTypes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: lodash.camelCase(newPartyType),
        description: newPartyType,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        getPartyTypes().then((response) => {
          let options = response?.map((pa) => {
            return {
              name: pa.description,
              value: pa._id,
              key: pa._id,
            };
          });

          setPartyTypeOptions(options);
        });
      })
      .finally(() => {
        setNewPartyType("");
        setSavingPartyType(false);
      });
  }

  function postAgreementType() {
    setSavingAgreementType(true);
    fetch(`${url}/agreementTypes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: lodash.camelCase(newAgreementType),
        description: newAgreementType,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
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
      })
      .finally(() => {
        setNewAgreementType("");
        setSavingAgreementType(false);
      });
  }

  function postStatusOfExecution() {
    setSavingStatusOfExecution(true);
    fetch(`${url}/executionStatuses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: lodash.camelCase(newStatusOfExecution),
        description: newStatusOfExecution,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
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
      })
      .finally(() => {
        setNewStatusOfExecution("");
        setSavingStatusOfExecution(false);
      });
  }

  function postExpiryAction() {
    setSavingExpiryAction(true);
    fetch(`${url}/expiryActions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: lodash.camelCase(newExpiryActions),
        description: newExpiryActions,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
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
      })
      .finally(() => {
        setNewExpiryActions("");
        setSavingExpiryAction(false);
      });
  }

  return (
    <div className="flex flex-col space-y-5">
      <h1>Master Data</h1>

      <div className="grid md:grid-cols-4 gap-10">
        {/* Master 1 - Party Types */}
        <div className="flex flex-col space-y-3">
          <div className="z-10">
            <ListBox
              selected={partyType}
              setSelected={setPartyType}
              onChange={(e) => console.log(e)}
              label="Available Party types"
              options={partyTypeOptions}
            />
          </div>

          <TextField
            label="New Party type"
            value={newPartyType}
            onChange={(e) => setNewPartyType(e)}
          />

          <Button
            onClick={() => postPartyType()}
            isDisabled={newPartyType?.length < 1 || savingPartyType}
          >
            Save
          </Button>
        </div>

        {/* Master 2 - File Types */}
        <div className="flex flex-col space-y-3">
          <div className="z-10">
            <ListBox
              selected={agreementType}
              setSelected={setAgreementType}
              onChange={(e) => console.log(e)}
              label="Available File types"
              options={agreementTypeOptions}
            />
          </div>

          <TextField
            label="New File type"
            value={newAgreementType}
            onChange={(e) => setNewAgreementType(e)}
          />

          <Button
            onClick={() => postAgreementType()}
            isDisabled={newAgreementType?.length < 1 || savingAgreementType}
          >
            Save
          </Button>
        </div>

        {/* Master 3 - Statuses of exectution */}
        <div className="flex flex-col space-y-3">
          <div className="z-10">
            <ListBox
              selected={statusOfExecution}
              setSelected={setStatusOfExecution}
              onChange={(e) => console.log(e)}
              label="Available Statuses of execution"
              options={executionStatusesOptions}
            />
          </div>

          <TextField
            label="New Status of execution"
            value={newStatusOfExecution}
            onChange={(e) => setNewStatusOfExecution(e)}
          />

          <Button
            onClick={() => postStatusOfExecution()}
            isDisabled={
              newStatusOfExecution?.length < 1 || savingStatusOfExecution
            }
          >
            Save
          </Button>
        </div>

        {/* Master 4 - Expiry actions */}
        <div className="flex flex-col space-y-3">
          <div className="z-10">
            <ListBox
              selected={requiredAction}
              setSelected={setRequiredAction}
              onChange={(e) => console.log(e)}
              label="Available Expiry actions"
              options={expiryActionsOptions}
            />
          </div>

          <TextField
            label="New Status of execution"
            value={newExpiryActions}
            onChange={(e) => setNewExpiryActions(e)}
          />

          <Button
            onClick={() => postExpiryAction()}
            isDisabled={newExpiryActions?.length < 1 || savingExpiryAction}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
