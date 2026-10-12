import React from "react";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";

const MobileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px 112px;
  font-family: "Montserrat";
  color: #000;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
`;

const BreadCrumbs = styled.p`
  font-size: 12px;
  line-height: 20px;
  margin: 8px 0 0;
`;

const Card = styled.div`
  background-color: ${({ $green }) => ($green ? "#E2EDD0" : "#DDE5F8")};
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardTitle = styled.h3`
  font-size: ${({ $big }) => ($big ? "18px" : "14px")};
  font-weight: 500;
  line-height: 24px;
  margin: 0;
`;

const CardText = styled.p`
  font-size: 13px;
  line-height: 20px;
  margin: 0;
`;

const Field = styled.textarea`
  width: 100%;
  min-height: ${({ $tall }) => ($tall ? "90px" : "64px")};
  border: none;
  border-radius: 7px;
  background-color: #ffffff;
  padding: 12px 14px;
  font-family: "Montserrat";
  font-size: 13px;
  line-height: 20px;
  outline: none;
  resize: none;

  &::placeholder {
    color: #8a8a8a;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 7px;
  background-color: #ffffff;
  padding: 0 14px;
  font-family: "Montserrat";
  font-size: 13px;
  outline: none;
`;

const Button = styled.button`
  width: 100%;
  height: 36px;
  border: none;
  border-radius: 5px;
  background-color: #ffffff;
  font-family: "Montserrat";
  font-size: 13px;
  color: #000;
  cursor: pointer;

  &:disabled {
    background-color: #e9e9e9;
    color: #9a9a9a;
    cursor: default;
  }
`;

const TestCard = styled.div`
  position: relative;
  background-color: #ffffff;
  border-radius: 7px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  line-height: 20px;

  .close {
    position: absolute;
    top: 4px;
    right: 6px;
    font-size: 20px;
    cursor: pointer;
  }
`;

const TestRow = styled.label`
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 12px;

  input {
    flex: 1;
    min-width: 0;
    border: none;
    border-bottom: 1px solid #000;
    background: transparent;
    font-family: "Montserrat";
    font-size: 12px;
    outline: none;
  }
`;

const BottomButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
`;

const BottomButton = styled.button`
  height: 44px;
  border: none;
  border-radius: 7px;
  background-color: ${({ $cancel }) => ($cancel ? "#D9D9D9" : "#E2EDD0")};
  font-family: "Montserrat";
  font-size: 13px;
  color: #000;
  cursor: pointer;
`;

const TestsList = ({ tests, onRemove }) =>
  tests.map((test, idx) => (
    <TestCard key={test.id}>
      <span>
        Тест {idx + 1}
        {test.name ? ` "${test.name}"` : ""}
      </span>
      <TestRow>
        Входные данные:
        <input type="text" value={test.inp} readOnly />
      </TestRow>
      <TestRow>
        Вывод:
        <input type="text" value={test.out} readOnly />
      </TestRow>
      <IoIosClose className="close" onClick={() => onRemove(idx)} />
    </TestCard>
  ));

const Restriction = ({ title, placeholder, value, onChange, onSave }) => (
  <>
    <CardTitle>{title}</CardTitle>
    <Field placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    <Button type="button" onClick={onSave}>
      Сохранить
    </Button>
    <Button type="button" onClick={() => onChange("")}>
      Удалить
    </Button>
  </>
);

const LaboratoryAddMobile = ({
  labTitle,
  setLabTitle,
  onSaveTitle,
  labDescription,
  setLabDescription,
  selectedGroup,
  setSelectedGroup,
  groups,
  tests,
  onRemoveTest,
  newTest,
  setNewTest,
  onAddTest,
  formulaDraft,
  setFormulaDraft,
  onAddFormula,
  maxVariables,
  setMaxVariables,
  speedLimit,
  setSpeedLimit,
  attemptsCount,
  setAttemptsCount,
  onSaveRestriction,
  onCancel,
  onSubmit,
}) => (
  <MobileForm onSubmit={onSubmit}>
    <BreadCrumbs>Лабораторные работы/Создание лабораторной работы</BreadCrumbs>

    <Card>
      <Field
        placeholder="Введите название лабораторной работы"
        value={labTitle}
        onChange={(e) => setLabTitle(e.target.value)}
      />
      <Button type="button" disabled={!labTitle.trim()} onClick={onSaveTitle}>
        Сохранить изменения
      </Button>
    </Card>

    <Card>
      <CardTitle>Описание лабораторной</CardTitle>
      <Field
        $tall
        placeholder="Введите описание лабораторной работы"
        value={labDescription}
        onChange={(e) => setLabDescription(e.target.value)}
      />
    </Card>

    <Card $green>
      <CardTitle $big>Выбор группы</CardTitle>
      <CardText>Выберите группы, которым будет доступна лабораторная работа</CardText>
      <Select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
        <option value="">Группа</option>
        {groups.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </Select>
    </Card>

    <Card $green>
      <CardTitle>Список тестов</CardTitle>
      <TestsList tests={tests} onRemove={onRemoveTest} />
      <CardTitle>Добавить новый тест</CardTitle>
      <TestCard>
        <TestRow>
          Название теста:
          <input
            type="text"
            value={newTest.name}
            onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
          />
        </TestRow>
        <TestRow>
          Входные данные:
          <input
            type="text"
            value={newTest.inp}
            onChange={(e) => setNewTest({ ...newTest, inp: e.target.value })}
          />
        </TestRow>
        <TestRow>
          Формат ввода:
          <input
            type="text"
            value={newTest.format}
            onChange={(e) => setNewTest({ ...newTest, format: e.target.value })}
          />
        </TestRow>
        <TestRow>
          Вывод:
          <input
            type="text"
            value={newTest.out}
            onChange={(e) => setNewTest({ ...newTest, out: e.target.value })}
          />
        </TestRow>
      </TestCard>
      <Button type="button" onClick={onAddTest}>
        Добавить тест
      </Button>
    </Card>

    <Card>
      <CardTitle>Список тестов</CardTitle>
      <TestsList tests={tests} onRemove={onRemoveTest} />
      <CardTitle>Формулы</CardTitle>
      <Field
        $tall
        placeholder="Введите формулу"
        value={formulaDraft}
        onChange={(e) => setFormulaDraft(e.target.value)}
      />
      <Button type="button" onClick={onAddFormula}>
        Добавить формулу
      </Button>
    </Card>

    <Card $green>
      <Restriction
        title="Количество переменных"
        placeholder="Введите максимальное количество переменных"
        value={maxVariables}
        onChange={setMaxVariables}
        onSave={onSaveRestriction}
      />
      <Restriction
        title="Скорость работы"
        placeholder="Введите ограничение по скорости в секундах"
        value={speedLimit}
        onChange={setSpeedLimit}
        onSave={onSaveRestriction}
      />
      <Restriction
        title="Количество попыток"
        placeholder="Максимальное количество попыток"
        value={attemptsCount}
        onChange={setAttemptsCount}
        onSave={onSaveRestriction}
      />
    </Card>

    <BottomButtons>
      <BottomButton type="button" $cancel onClick={onCancel}>
        Отмена
      </BottomButton>
      <BottomButton type="submit">Сохранить</BottomButton>
    </BottomButtons>
  </MobileForm>
);

export default LaboratoryAddMobile;
