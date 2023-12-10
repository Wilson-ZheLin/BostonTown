import {Form, Input, Select, Button, Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import sendRequest from '../../../../src/components/sendRequest';

const Signup = () => {
    const [countries, setCountries] = useState([]);

    const [searchValue, setSearchValue] = useState('');

    const [firstName, setFirstName] = useState("");

    const [lastName, setLastName] = useState("");

    const [userName, setUserName] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [age, setAge] = useState("");

    const [country, setCountry] = useState("");

    const [mobile, setMobile] = useState("");

    //const [image, setImage] = useState("");

    const [emailId, setEmail] = useState("");

    const [profession, setProfession] = useState("");

    const [description, setDescription] = useState("");

    const [petPreference, setPetPreference] = useState("");

    const [foodPreference, setFoodPreference] = useState("");





    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error.message);
            }
        };

        fetchCountries();
    }, []);

    const handleSearch = (value) => {
        setSearchValue(value);
    };

    const sortedCountries = countries.slice().sort((a, b) => {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    const callCreateNewUserAPI = async () => {
        try {
            console.log("callCreateNewUserAPI: try");
            const response = await sendRequest("http://localhost:3000/createNewUser", {
                "firstname": firstName,
                "lastname": lastName,
                "username": userName,
                "password": password,
                "confirm_password": confirmPassword,
                //"image":file.originFileObj,
                "age": age,
                "country": country,
                "mobile": mobile,
                "email": emailId,
                "profession": profession,
                "description": description,
                "food_preferences": foodPreference,
                "pet_preferences": petPreference
            }, "POST", {})

            console.log("response => ", response);
        } catch (error) {
            console.log("callCreateNewUserAPI: catch");
        }
    }

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    }

    const onChangeUserName = (e) => {
        setUserName(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const onChangeAge = (e) => {
        setAge(e.target.value);
    }

    const onChangeCountry = (value) => {
        setCountry(value);
    }

    const onChangeMobile = (e) => {
        setMobile(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangeProfession = (e) => {
        setProfession(e.target.value);
    }

    const onChangeDescription= (e) => {
        setDescription(e.target.value);
    }


    const onChangeFoodPreference = (value) => {
        setFoodPreference(value);
    }
    
      const onChangePetPreference = (value) => {
        setPetPreference(value);
    }


    return (
        <>
            <Form.Item
                label="FirstName"
                name="firstname"
                rules={[
                    {
                    required: true,
                    message: 'Please input your firstname!',
                    },
                ]}
                >
                <Input onBlur={onChangeFirstName} />
                </Form.Item>

            <Form.Item
            label="LastName"
            name="lastname"
            rules={[
                {
                required: true,
                message: 'Please input your lastname!',
                },
            ]}
            >
                <Input onBlur={onChangeLastName} />
            </Form.Item>

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                    required: true,
                    message: 'Please input your username!',
                    },
                ]}
                >
            <Input onBlur={onChangeUserName} />
            </Form.Item>

            <Form.Item
            label="Password"
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            >
            <Input.Password onBlur={onChangePassword}/>
            </Form.Item>

            <Form.Item
            label="Confirm Password"
            name="confirmpassword"
            rules={[
                {
                required: true,
                message: 'Please confirm your password!',
                },
            ]}
            >
            <Input.Password onBlur={onChangeConfirmPassword}/>
            </Form.Item>

            <Form.Item
            label="Age"
            name="age"
            rules={[
                {
                required: true,
                message: 'Please input your age!',
                },
                
            ]}
            >
                <Input onBlur={onChangeAge}/>
            </Form.Item>
            <Form.Item label="Country" required>
                <Select
                    showSearch
                    id="country"
                    name="country"
                    filterOption={false}
                    onSearch={handleSearch}
                    onChange = {onChangeCountry}
                >
                    <Select.Option value="" disabled>
                        Select your country
                    </Select.Option>
                    {sortedCountries
                        .filter((country) =>
                            country.name.common.toLowerCase().includes(searchValue.toLowerCase())
                        )
                        .map((country) => (
                            <Select.Option key={country.name.common} value={country.name.common}>
                                {country.name.common}
                            </Select.Option>
                        ))}
                </Select>
            </Form.Item>

                <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input onBlur={onChangeMobile} />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input onBlur={onChangeEmail} />
            </Form.Item>

            <Form.Item
            name="uploadProfilePicture"
            label="Upload Profile Picture"
            valuePropName="fileList"
            >
            <Upload
            maxCount={1}
            >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
            </Form.Item>

            <Form.Item
                name="profession"
                label= "Profession"
                rules={[{ required: true, message: 'Please input your profession!' }]}
            >
                <Input onBlur={onChangeProfession} />
            </Form.Item>

            <Form.Item
                name="description"
                label= "Description"
                rules={[{ required: false, message: 'Please input your profession!' }]}
            >
                <Input onBlur={onChangeDescription} />
            </Form.Item>

            <Form.Item label="Food Preference" required>
                <Select onChange={onChangeFoodPreference} value={foodPreference}>
                <Select.Option value="veg">Veg</Select.Option>
                <Select.Option value="nonVeg">Non-Veg</Select.Option>
                <Select.Option value="none">None</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="Pet Preference">
                <Select onChange={onChangePetPreference} value={petPreference}>
                <Select.Option value="dog">Dog</Select.Option>
                <Select.Option value="cat">Cat</Select.Option>
                <Select.Option value="none">None</Select.Option>
                </Select>
            </Form.Item>

            <Button onClick={callCreateNewUserAPI} type="primary">Submit</Button>


        </>
    );
}

export default Signup;