import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Forma, Label, Input, Button, ErrorText } from './Searchbar.styled';
// import { RxMagnifyingGlass } from 'react-icons/rx';
import { MagnifyingGlass } from 'react-loader-spinner';

const schema = yup.object().shape({
  query: yup.string().required('Search string is required'),
});

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (query, { resetForm }) => {
    onSubmit(query);
    resetForm();
  };

  const initialValues = {
    query: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Forma>
        <Label>
          <Input type="text" name="query" />
          <ErrorText name="query" component="div" />
        </Label>

        <Button type="submit">
          {/* <RxMagnifyingGlass />
          <Text>Search</Text> */}
          <MagnifyingGlass
            visible={true}
            height="45"
            width="45"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        </Button>
      </Forma>
    </Formik>
  );
};

Searchbar.prototype = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
