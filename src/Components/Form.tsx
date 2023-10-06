import { ChangeEvent, FormEvent, useState } from "react";
import { formatDateToYYYYMMDD } from "../Helpers/formatDateToYYYYMMDD";
import { formatTimeToHHMM } from "../Helpers/formatTimeToHHMM";
import { formTimeValidation } from "../Helpers/formTimeValidation";
import { formTitleRequired } from "../Helpers/formInputValidation";
import { OnClickFormData } from "../App";

import classNames from "classnames";

import style from "./Form.module.css";
import { Button } from "./Button";

export interface FormData {
  title: string;
  date: string;
  start: string;
  end: string;

  titlePristine: boolean;
  submited: boolean;
}

interface FormErrors {
  title?: string;
  start?: string;
  end?: string;
}

export const Form: React.FC<{
  onSave: (formValues: FormData) => void;
  initFormData: OnClickFormData;
}> = ({ onSave, initFormData }) => {
  const [formData, setFormData] = useState<FormData>(() => {
    const eventEndDate = new Date(new Date());
    eventEndDate.setHours(new Date().getHours() + 1);

    return {
      title: "",
      date: initFormData.date
        ? initFormData.date
        : formatDateToYYYYMMDD(new Date()),
      start: initFormData.start
        ? initFormData.start
        : formatTimeToHHMM(new Date()),
      end: initFormData.end ? initFormData.end : formatTimeToHHMM(eventEndDate),
      titlePristine: true,
      submited: false,
    };
  });

  const handleTitleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      title: value,
      titlePristine: false,
    }));
  };

  const handleTimeChange =
    (name: "date" | "start" | "end") =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = e.target;
      setFormData((prevData): FormData => ({ ...prevData, [name]: value }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { title, end, start } = getFormErrors(formData);

    if (!title && !end && !start) {
      const formValues = {
        ...formData,
        title: formData.title.trim(),
      };

      onSave(formValues);
    } else {
      setFormData((s) => ({ ...s, submited: true }));
    }
  };

  const formErrors = getFormVisibleErrors(formData);

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        className={[style.formHeader, formErrors.title ? style.error : ""].join(
          " "
        )}
        type="text"
        placeholder="Add title"
        name="title"
        value={formData.title}
        onChange={handleTitleInputChange}
      />

      <nav>
        <ul className={style["formNav"]}>
          <li>
            <button
              type="button"
              className={classNames(
                style.eventBtn,
                style.navBtn,
                style.formItem
              )}
              data-target="event"
            >
              Event
            </button>
          </li>
          <li>
            <Button
              className={classNames(
                style.eventBtn,
                style.navBtn,
                style.formItem
              )}
            >
              Focus time
            </Button>

            {/* <button
              type="button"
              className={`${style["eventBtn"]} ${style["navBtn"]} ${style["formItem"]}`}
            >
              Focus time
            </button> */}
          </li>
          <li>
            <button
              type="button"
              className={`${style["eventBtn"]} ${style["navBtn"]} ${style["formItem"]}`}
              data-target="office"
            >
              Out of office
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${style["eventBtn"]} ${style["navBtn"]} ${style["formItem"]}`}
            >
              Work location
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${style["eventBtn"]} ${style["navBtn"]} ${style["formItem"]}`}
            >
              Task
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${style["eventBtn"]} ${style["navBtn"]} ${style["formItem"]}`}
            >
              Appointment schedule
            </button>
          </li>
        </ul>
      </nav>

      <section data-tab="event">
        <span>
          <label className={style["timeSet__wrapper"]}>
            <input
              className={`${style["dateSet"]} ${style["formItem"]}`}
              type="date"
              name="date"
              aria-required="true"
              value={formData.date}
              onChange={handleTimeChange("date")}
            />
            <input
              className={`${style["dateSet"]} ${style["formItem"]} ${
                formErrors.start ? "error" : ""
              }`}
              type="time"
              name="start"
              value={formData.start}
              onChange={handleTimeChange("start")}
            />
            <span> - </span>
            <input
              className={`${style["dateSet"]} ${style["formItem"]} ${
                formErrors.end ? "error" : ""
              }`}
              type="time"
              name="end"
              value={formData.end}
              onChange={handleTimeChange("end")}
            />
          </label>
        </span>

        <span className={style["checkbox"]}>
          <label className={style["checkbox__label"]}>
            <input
              className={`${style["checkbox__input"]} ${style["formItem"]}`}
              type="checkbox"
            ></input>
            <span>All day</span>
          </label>
          <button
            type="button"
            className={`${style["eventBtn"]} ${style["navBtn"]} ${style["formItem"]}`}
          >
            Time zone
          </button>
        </span>

        <label>
          <select
            className={`${style["select"]} ${style["formItem"]}`}
            name="selectBusyFree"
          >
            <option value="Busy">Busy</option>
            <option value="Free">Free</option>
          </select>
        </label>

        <label>
          <input
            className={`${style["checkbox__guest"]} ${style["formItem"]}`}
            type="text"
            placeholder="Add guest"
          />
        </label>

        <label>
          <select className={`${style["remoteType"]} ${style["formItem"]}`}>
            <option value="">Add video conferencing</option>
            <option value="remote-google">Google meet</option>
            <option value="remote-zoom">Zoom Meeting</option>
          </select>
        </label>

        <label>
          <input
            className={`${style["checkbox__location"]} ${style["formItem"]}`}
            type="text"
            placeholder="Add rooms or location"
          />
        </label>

        <div className={`${style["description_wrapper"]} ${style["formItem"]}`}>
          <label className={style["labelDescription"]}>
            Add
            <input
              className={style["inputDescription"]}
              type="text"
              placeholder="description"
            />
          </label>

          <span>or</span>

          <label className={style["inputLabel"]}>
            attachments
            <input className={style["inputFile"]} type="file" />
          </label>
        </div>

        <span className={style["creatorName"]}>Ieva Staseviciute</span>
        <ul className={style["creatorSettings"]}>
          <li>Busy</li>
          <li>Default visibility</li>
          <li>Notify 10 minutes before</li>
        </ul>
      </section>

      {formErrors.title && (
        <span className={style["errorMsg"]}>{formErrors.title}</span>
      )}

      {formErrors.start && (
        <span className={style["errorMsg"]}>{formErrors.start}</span>
      )}

      {formErrors.end && (
        <span className={style["errorMsg"]}>{formErrors.end}</span>
      )}

      <div className={style["btnWrapper"]}>
        <button
          type="button"
          className={`${style["eventBtn"]} ${style["moreBtn"]}`}
        >
          More options
        </button>
        <button
          className={`${style["eventBtn"]} ${style["saveBtn"]}`}
          name="intent-save"
          value="save"
        >
          Save
        </button>
      </div>
    </form>
  );
};

const checkTime = ({ date, start, end }: FormData) => {
  const timeErrorList = formTimeValidation(date, start, end);
  return timeErrorList;
};

const checkTitle = (title: string) => {
  const titleError = formTitleRequired(title);
  return titleError;
};

function getFormErrors(state: FormData): FormErrors {
  return {
    title: checkTitle(state.title),
    ...checkTime(state),
  };
}

function getFormVisibleErrors(state: FormData): FormErrors {
  return {
    title:
      !state.titlePristine || state.submited
        ? checkTitle(state.title)
        : undefined,
    ...checkTime(state),
  };
}
