import React from 'react';

type Props = {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const SearchInput = ({ placeholder, value, onChange }: Props) => {
  return (
    <div>
      <div className="row">
        <div className="input-field col s12">
          <input type="search" placeholder={placeholder} onChange={onChange} value={value} />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
