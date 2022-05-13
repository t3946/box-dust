export default {
    methods: {
        formId( formName ) {
            return `form-${ formName.toLowerCase() }`;
        },

        inputId( inputName ) {
            return `input-${ inputName.toLowerCase() }`;
        },
    },
};