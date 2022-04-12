import * as yup from 'yup';

export default {
    LoginSchem: yup.object().shape({
        email: yup.string().email('Email needed').required('required')
    })
}