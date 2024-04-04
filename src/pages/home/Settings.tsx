import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import vite from "../../../public/vite.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import useSWR from "swr";
import UpdateLoadinPage from "../../common/reuse/UpdateLoadinPage";
import { updateAccountImage } from "../../apis/authenticationApi";
import Swal from "sweetalert2";

const Settings = () => {
    const [image, setImage] = useState<File | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [canEdit, setCanEdit] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    const auth = useSelector((state: any) => state.user);

    const fetcher = async (url: any) => {
        try {
            const response = await axios.get(url);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    };
    const userID = auth?._id;
    const { data } = useSWR(`https://profile-practice.onrender.com/api/v1/${userID}/get-details`, fetcher);

    useEffect(() => {
        if (data) {
            setFirstName(data.firstName);
            setLastName(data.lastName || "");
            setPhoneNumber(data.phoneNumber || "");
            setAddress(data.address || "");
        }
    }, [data]);

    const onHandleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const maxSizeInBytes = 7 * 1024 * 1024;
            if (file.size > maxSizeInBytes) {
                Swal.fire({
                    icon: "error",
                    title: "Image size too large",
                    text: "Please upload an image that is less than 7MB in size.",
                    timerProgressBar: true,
                    timer: 3000
                });
                return;
            }
            // Update the image preview
            const save = URL.createObjectURL(file);
            setAvatar(save);
            setImage(file);
        }
    };

    const handleEdit = () => {
        setCanEdit(!canEdit);
    };

    const handleUpdateProfile = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("address", address);
            formData.append("phoneNumber", phoneNumber);
            if (image) {
                formData.append("image", image);
            }

            await updateAccountImage(userID, formData);

            Swal.fire({
                icon: "success",
                title: "Profile updated successfully",
                timerProgressBar: true,
                timer: 3000
            });
            setLoading(false);
            setCanEdit(false);
            window.location.reload();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error updating account",
                timerProgressBar: true,
                timer: 3000
            });
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <UpdateLoadinPage />}
            <div className="w-full min-h-[90vh] flex items-center justify-center bg-white relative">
                <div className="w-[70%] max-md:w-[95%] border rounded-md min-h-[80vh] shadow-md flex flex-col items-center">
                    {/* Image Change part starts here*/}
                    <div className="relative w-[130px] max-md:w-[90px] max-md:h-[90px] h-[130px]">
                        <img
                            src={avatar || data?.image || vite}
                            alt="Profile"
                            className="relative w-full object-cover object-top overflow-hidden h-full rounded-full border my-4"
                        />
                        <label htmlFor="image">
                            <div className="absolute hover:cursor-pointer bottom-0 px-2 py-2 rounded-full bg-gray-400 right-0"><FaPen className="" /></div>
                        </label>
                        <input type="file" hidden id="image" onChange={onHandleImage} />
                    </div>
                    {/* Image change part ends here */}
                    <div className="my-6 py-2 hover:cursor-pointer px-3 text-white rounded-md" />
                    {/* Input part */}
                    <div className="w-[95%] gap-4 grid grid-cols-2 max-md:grid-cols-1">
                        <input
                            type="text"
                            id="firstName"
                            disabled={!canEdit}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="h-[45px] w-full pl-3 border rounded-md border-gray-200 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                            placeholder="First Name"
                        />
                        <input
                            type="text"
                            id="lastName"
                            disabled={!canEdit}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="h-[45px] w-full pl-3 border rounded-md border-gray-200 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                            placeholder="Last Name"
                        />
                        <input
                            type="text"
                            id="phoneNumber"
                            disabled={!canEdit}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="h-[45px] w-full pl-3 border rounded-md border-gray-200 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                            placeholder="Phone Number"
                        />
                        <input
                            type="text"
                            id="address"
                            disabled={!canEdit}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="h-[45px] w-full pl-3 border rounded-md border-gray-200 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                            placeholder="Address"
                        />
                    </div>
                    <button className={`w-[95%] my-6 h-[50px] ${!canEdit ? "bg-[#40196D]" : "bg-gray-300"} text-white rounded-md`} onClick={handleEdit}>{!canEdit ? "Edit Profile" : "Cancel"}</button>
                    {canEdit && <button className="w-[95%] h-[50px] bg-[#40196D] text-white rounded-md" onClick={handleUpdateProfile}>Update Profile</button>}
                </div>
            </div>
        </>
    );
};

export default Settings;
