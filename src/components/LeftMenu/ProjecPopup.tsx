import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hook";
import {
  delProject,
  changeProjectTitle,
} from "../../feauters/project/asyncActions";
import styles from "./leftMenu.module.scss";

type PopupProps = {
  trigger: boolean;
  anchorPoint: {
    x: number;
    y: number;
  };
  id: string;
  onHandlePopupProject: () => void;
};

export const ProjecPopup = (props: PopupProps) => {
  const { id, anchorPoint, trigger, onHandlePopupProject } = props;
  const [newProjectName, setNewProjectName] = useState("");
  const [needToChangeProjectName, setNeedToChangeProjectName] = useState(false);
  const dispatch = useAppDispatch();

  const onHandleDeleteProject = () => {
    dispatch(delProject(id));
    onHandlePopupProject();
    setNewProjectName("");
    setNeedToChangeProjectName(false);
  };

  const onHandleChangeNameProject = () => {
    dispatch(changeProjectTitle({ project: newProjectName, id }));
    setNewProjectName("");
    setNeedToChangeProjectName(false);
    onHandlePopupProject();
  };

  const letsChangeNameProject = () => {
    setNeedToChangeProjectName(true);
  };

  useEffect(() => {
    !trigger ? setNeedToChangeProjectName(false) : null;
  }, [trigger]);
  return trigger ? (
    <div
      className={`
    ${styles.popup}
    ${styles.popup__left_menu}
    `}
    >
      <div
        className={styles.popup_inner}
        style={{ top: anchorPoint.y, left: anchorPoint.x }}
      >
        {!needToChangeProjectName ? (
          <>
            <p>Выберите действие :</p>

            <button
              className={`
              ${styles.button_project}
              ${styles.left_menu__button}
              ${styles.poppup_inner__menu}
              `}
              onClick={letsChangeNameProject}
            >
              Изменить
            </button>
            <button
              className={`
              ${styles.button_project}
              ${styles.left_menu__button}
              ${styles.poppup_inner__menu}
              `}
              onClick={onHandleDeleteProject}
            >
              Удалить
            </button>
          </>
        ) : (
          <>
            <p>Введите новое имя проекта</p>
            <input
              className={styles.projec_popup__input}
              type="text"
              placeholder="Ведите название проекта"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.currentTarget.value)}
            />
            <div className={styles.left_menu__buttons}>
              <button
                className={`
                ${styles.button_project}
                ${styles.left_menu__button}
                `}
                onClick={onHandlePopupProject}
              >
                Отмена
              </button>
              <button
                className={`
                ${styles.button_project}
                ${styles.left_menu__button}`}
                onClick={onHandleChangeNameProject}
              >
                Ок
              </button>
            </div>
          </>
        )}
        <button className={styles.close_btn} onClick={onHandlePopupProject}>
          x
        </button>
      </div>
    </div>
  ) : null;
};
