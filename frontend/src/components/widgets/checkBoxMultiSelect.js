import {Card, Form} from "react-bootstrap";
import {useEffect, useState} from "react";

const CheckboxElem = ({option, defaultChecked, handleChange, empty, label}) => {
    const [checked, setChecked] = useState(false)

    const checkChange = (e) => {
        setChecked(e.target.checked)
        handleChange(e)
    }

    useEffect(() => {
        if (defaultChecked) {
            setChecked(defaultChecked)
        }
    }, [defaultChecked])

    useEffect(() => {
        empty && setChecked(false);
    }, [empty]);

    return (
        <Form.Check
            type={'checkbox'}
            id={`checkbox-${option.id}`}
            checked={checked}
            label={option[label]}
            value={option.id}
            onChange={checkChange}
        />
    )
}

export const CheckBoxMultiSelect = ({options, label, title, checkedFields, setCheckedFields}) => {

    const handleChange = (e) => {
        let checked_id = e.target.value
        if (!checkedFields.includes(checked_id) && e.target.checked) {
            setCheckedFields(old => [...old, checked_id]);
        }
        if (checkedFields.includes(checked_id) && !e.target.checked) {
            let filteredArray = checkedFields.filter(item => item !== checked_id)
            setCheckedFields(filteredArray)
        }
    }

    if (options.length > 0) {
        return (
            <Card body>
                <Card.Title>{title}</Card.Title>
                <Form>
                    {options.map(option => {
                        return (
                            <CheckboxElem label={label}
                                          defaultChecked={checkedFields && checkedFields.includes(option.id.toString()) && option.id}
                                          empty={checkedFields && checkedFields.length === 0} option={option} handleChange={handleChange}/>
                        )
                    })}
                </Form>
            </Card>
        )
    } else return null

}