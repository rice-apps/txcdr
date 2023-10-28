import React from 'react';
import { View, TextInput, Button, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  impacted: yup.string().label('Impacted').required(),
  name: yup.string().label('Name').required(),
  phone: yup.string().label('Phone').required(),
  email: yup.string().label('Email').required().email(),
  homeownerStatus: yup.string().label('Homeowner Status').required(),
  primaryLanguage: yup.string().label('Primary Language').required(),
  needHelp: yup.string().label('Help Required').required(),
  roofStatus: yup.string().label('Roof Status').required(),
  floodHeight: yup.number().label('Flood Height').required(),
  canStay: yup.string().label('Can Stay').required(),
  compassionateCare: yup.string().label('Compassionate Care').required(),
  caseManager: yup.string().label('Case Manager').required(),
});

const MyForm = ({ onSubmit }) => {
  const formikProps = useFormik({
    initialValues: {
      impacted: '',
      name: '',
      phone: '',
      email: '',
      homeownerStatus: '',
      primaryLanguage: '',
      needHelp: '',
      roofStatus: '',
      floodHeight: 0,
      canStay: '',
      compassionateCare: '',
      caseManager: '',
    },
    onSubmit,
    validationSchema,
  });

  return (
    <View>
      <Picker
        selectedValue={formikProps.values.impacted}
        onValueChange={(value) => formikProps.setFieldValue('impacted', value)}
      >
        <Picker.Item label="Were you impacted by the disaster?" value="" />
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>

      <TextInput
        placeholder="Enter your name"
        onChangeText={formikProps.handleChange('name')}
        onBlur={formikProps.handleBlur('name')}
        value={formikProps.values.name}
      />
    {formikProps.touched.name && formikProps.errors.name &&
      <Text style={{ color: 'red' }}>{formikProps.errors.name}</Text>
    }

    <TextInput
      placeholder="Enter your phone"
      onChangeText={formikProps.handleChange('phone')}
      onBlur={formikProps.handleBlur('phone')}
      value={formikProps.values.phone}
      keyboardType="phone-pad"
    />
    {formikProps.touched.phone && formikProps.errors.phone &&
      <Text style={{ color: 'red' }}>{formikProps.errors.phone}</Text>
    }

    <TextInput
      placeholder="Enter your email"
      onChangeText={formikProps.handleChange('email')}
      onBlur={formikProps.handleBlur('email')}
      value={formikProps.values.email}
      keyboardType="email-address"
      autoCapitalize="none"
    />
    {formikProps.touched.email && formikProps.errors.email &&
      <Text style={{ color: 'red' }}>{formikProps.errors.email}</Text>
    }

    <Picker
        selectedValue={formikProps.values.homeownerStatus}
        onValueChange={(value) => formikProps.setFieldValue('homeownerStatus', value)}
      >
        <Picker.Item label="Are you the homeowner or a tenant?" value="" />
        <Picker.Item label="Homeowner" value="homeowner" />
        <Picker.Item label="Tenant" value="tenant" />
      </Picker>

    <TextInput
      placeholder='Primary Language'
      onChangeText = {formikProps.handleChange('primaryLanguage')}
      onBlur = {formikProps.handleBlur('primaryLanguage')}
      value = {formikProps.values.primaryLanguage}
    />

      <Picker
        selectedValue={formikProps.values.needHelp}
        onValueChange={(value) => formikProps.setFieldValue('needHelp', value)}
      >
        <Picker.Item label="Do you need help with short-term repairs to your home or debris management" value="" />
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>

      <Picker
        selectedValue={formikProps.values.roofStatus}
        onValueChange={(value) => formikProps.setFieldValue('roofStatus', value)}
      >
        <Picker.Item label="Is your roof damaged or leaking?" value="" />
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>

      <TextInput
      placeholder='How high were the flood waters? (inches)'
      onChangeText = {formikProps.handleChange('floodHeight')}
      onBlur = {formikProps.handleBlur('floodHeight')}
      value = {formikProps.values.floodHeight}
    />

      <Picker
        selectedValue={formikProps.values.canStay}
        onValueChange={(value) => formikProps.setFieldValue('canStay', value)}
      >
        <Picker.Item label="Are you able to stay in the home?" value="" />
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>

      <Picker
        selectedValue={formikProps.values.compassionateCare}
        onValueChange={(value) => formikProps.setFieldValue('compassionateCare', value)}
      >
        <Picker.Item label="Can we refer you to our compassionate care team?" value="" />
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>

      <Picker
        selectedValue={formikProps.values.caseManager}
        onValueChange={(value) => formikProps.setFieldValue('caseManager', value)}
      >
        <Picker.Item label="Can we refer you to a disaster case manager?" value="" />
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>

      


    <Button title="Submit" onPress={formikProps.handleSubmit} />
    </View>
  );
};


export default MyForm;
