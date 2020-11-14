import React, { FormEvent, useEffect, useState } from 'react';

import Card from '../components/card/Card';
import Button from '../components/button/Button';
import {
  getIdentifier,
  getNextIdentifier,
  updateIdentifier,
} from '../common/ApiUtils';
import { getEventValue, curry } from '../common/Utils';

const updateStateFromApi = curry(
  (updateStateFn: Function, apiFn: Function, payload: any = undefined) => {
    return (async () => {
      const response = await apiFn(payload);
      updateStateFn(response.data);
    })();
  }
);

const handleInputValue = (updateStateFn: Function) => (event: any) => {
  const inputValue = getEventValue(event);
  updateStateFn(isNaN(+inputValue) ? inputValue : +inputValue);
};

const Identifier = () => {
  const [identifier, setIdentifier] = useState('');
  const setInputIdentifierValue = handleInputValue(setIdentifier);
  const handleSetIdentifier = updateStateFromApi(setIdentifier);
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleSetIdentifier(updateIdentifier, { integer: Number(identifier) });
  };

  useEffect(() => {
    handleSetIdentifier(getIdentifier);
    // eslint-disable-next-line
  }, [setIdentifier]);

  return (
    <div className="App">
      <Card>
        <h4>👋 Hey!</h4>
        <form onSubmit={(event) => handleFormSubmit(event)}>
          <label>
            <p>Current identifier</p>
            <input
              type="text"
              value={identifier.toString()}
              onInput={(event) => setInputIdentifierValue(event)}
            />
          </label>
          <br />
          <Button type="submit">Update Identifier</Button>
          <br />
        </form>
        <Button onClick={() => handleSetIdentifier(getNextIdentifier)}>
          Next Identifier
        </Button>
      </Card>
    </div>
  );
};

export default Identifier;
