import React, { useState } from 'react';
import {
  Route,
  useRouteMatch,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import { SectionMessage } from 'tapis-ui/_common';
import MeasurementsListing from '../../MeasurementsListing';
import DateTimePicker from 'react-datetime-picker';
import styles from './Router.module.scss';


const Router: React.FC<{ projectId: string; siteId: string }> = ({
  projectId,
  siteId,
}) => {
  const { path } = useRouteMatch();
  
  const [start, setStart] = useState<any>(null);
  const [end, setEnd] = useState<any>(null);

  const [limitInput, setLimitInput] = useState<string>("");
  const [offsetInput, setOffsetInput] = useState<string>("");

  const [limit, setLimit] = useState<number | undefined>(undefined);
  const [offset, setOffset] = useState<number | undefined>(undefined);

  const createLimit = (event: any) => {
    let value = event.target.value;
    setLimitInput(value);
  }

  const createOffset = (event: any) => {
    let value = event.target.value;
    setOffsetInput(value);
  }

  const validateLimit = (event: any) => {
    let value: number | undefined = parseInt(event.target.value);
    if(isNaN(value)) {
      value = undefined;
    }
    if(value !== undefined && value < 1) {
      value = 1;
    }
    setLimitInput(value?.toString() || "");
    setLimit(value);
  };

  const validateOffset = (event: any) => {
    let value: number | undefined = parseInt(event.target.value);
    if(isNaN(value)) {
      value = undefined;
    }
    if(value !== undefined && value < 0) {
      value = 0;
    }
    setOffsetInput(value?.toString() || "");
    setOffset(value);
  };


  return (
    <div>
      <div className={styles["date-select-bar"]}>
        <div className={styles["control"]}>
          Start Date
          <div>
            <DateTimePicker onChange={setStart} value={start} />
          </div>
        </div>
        <div className={styles["control"]}>
          End Date
          <div>
            <DateTimePicker onChange={setEnd} value={end} />
          </div>
        </div>
        <div className={styles["control"]}>
          Limit
          <div>
            <input
              className={styles["numeric-input"]}
              type="number"
              value={limitInput}
              onChange={createLimit}
              onBlur={validateLimit}
            />
          </div>
        </div>
        <div className={styles["control"]}>
          Offset
          <div>
            <input
              className={styles["numeric-input"]}
              type="number"
              value={offsetInput}
              onChange={createOffset}
              onBlur={validateOffset}
            />
          </div>
        </div>
      </div>
      <Switch>
        <Route path={path} exact>
          <SectionMessage type="info">
            Select an instrument from the list.
          </SectionMessage>
        </Route>

        <Route
          path={`${path}/:instrumentId`}
          render={({
            match: {
              params: { instrumentId },
            },
          }: RouteComponentProps<{ instrumentId: string }>) => (
            <MeasurementsListing
              projectId={projectId}
              siteId={siteId}
              instrumentId={instrumentId}
              start={start}
              end={end}
              limit={limit}
              offset={offset}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default Router;
