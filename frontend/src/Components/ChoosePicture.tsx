import { type ChangeEvent, useRef, useState } from "react";
import Cropper, { type ReactCropperElement } from "react-cropper";

import "cropperjs/dist/cropper.css";
import "./Styles/ChoosePicture.css";

import { ButtonClose } from "./ButtonClose";


interface ChoosePictureProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (file: File) => void;
}


export default function ChoosePicture({
    isOpen,
    onClose,
    onSave,
}: ChoosePictureProps) {


    const cropperRef = useRef<ReactCropperElement>(null);

    const [image, setImage] = useState<string>();
    const [avatar, setAvatar] = useState<File>();
    const [previousAvatar, setPreviousAvatar] = useState<File>();
    const [isEditing, setIsEditing] = useState(false);

    if (!isOpen) return null;


    function onFileChange(
        event: ChangeEvent<HTMLInputElement>
    ) {

        const file = event.target.files?.[0];

        if (!file) return;

        setImage(URL.createObjectURL(file));

        setAvatar(undefined);
        setPreviousAvatar(undefined);
        setIsEditing(true);
    }

    function handleEditAgain() {

        //Keeps the actual state in case the user cancels
        setPreviousAvatar(avatar);

        setIsEditing(true);
    }

    function handleCancelEdit() {
        setAvatar(previousAvatar);
        setPreviousAvatar(undefined);
        setIsEditing(false);
    }

    //Opening the cutter for the image
    function handleCrop() {

        const cropper = cropperRef.current?.cropper;

        if (!cropper) return;

        cropper
            .getCroppedCanvas({
                width: 512,
                height: 512,
            })
            .toBlob((blob) => {

                if (!blob) return;

                const file = new File(
                    [blob],
                    "avatar.png",
                    {
                        type: "image/png",
                    }
                );

                setAvatar(file);

                setPreviousAvatar(undefined);

                setIsEditing(false);

            }, "image/png");

    }


    function handleSave() {

        if (!avatar) return;

        onSave(avatar);
        onClose();
    }



    return (

        <div className="pictureModalOverlay">
            <div className="pictureModal" >
                <div className="pictureModalHeader">
                    <h2>
                        Foto de perfil
                    </h2>

                    <ButtonClose
                        size={25}
                        onClose={onClose}
                    />

                </div>

                <div className="pictureModalBody">

                    <label className="fileInput"> 
                        Escolher imagem
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onFileChange}
                        />
                    </label>


                    {image && isEditing && (

                        <div className="cropContainer">

                            {/* Squared image cutter working */}
                            <Cropper

                                ref={cropperRef}
                                src={image}
                                aspectRatio={1}
                                viewMode={1}
                                dragMode="move"
                                guides={true}
                                center={true}
                                background={false}
                                autoCropArea={1}
                                cropBoxResizable={false}
                                cropBoxMovable={false}
                                zoomable={true}
                                responsive={true}
                            />


                        </div>

                    )}

                    {/* Preview of the round profile image */}
                    {avatar && !isEditing && (
                        <div className="previewContainer">
                            <img
                                className="avatarPreview"
                                src={URL.createObjectURL(avatar)}
                                alt="Avatar"
                            />
                        </div>
                    )}
                </div>


                <div className="pictureModalFooter">

                    {isEditing && image && (
                        <>
                            <button
                                className="secondaryButton"
                                onClick={handleCancelEdit}
                            >
                                Cancelar

                            </button>

                            <button
                                className="primaryButton"
                                onClick={handleCrop}
                            >
                                Recortar
                            </button>
                        </>

                    )}


                    {avatar && !isEditing && (
                        <>
                            <button className="secondaryButton" onClick={handleEditAgain} > Editar novamente </button>

                            <button className="primaryButton" onClick={handleSave} > Salvar </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
