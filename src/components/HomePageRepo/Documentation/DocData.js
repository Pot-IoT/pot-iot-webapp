export const docAddAccount = {
    titleSection: 'Step 1 : Create a POT-IOT account',
    stepDescription:
        '* Visit https://www.pot-iot.com/signup and sign up for a new account.'
}

export const docAdd = {
    titleSection: 'Step 2 : Create a Device',
    stepDescription:
        '* 2.1 - Login to your POT-IOT account.\n\n'
        +
        '* 2.2 - Click "NEW DEVICE" button.\n\n'
        +
        '* 2.3 - Enter the Device Name, Description of the device, then click "ADD" button\n\n'
        +
        '* 2.4 - A successful window will be shown. Device ID and Private Key are generated for the device. Please click "SAVE TO LOCAL" button to download these information.\n'
}

export const docConnect = {
    titleSection: 'Step 3 : Connect IOT device to POT-IOT and upload data files',
    stepDescription:
        '* 3.1 - Visit our GitHub repo https://github.com/Pot-IoT/potiot-example-raspberry-pi and download the example code to Raspberry Pi.\n' +
        '\n' +
        '* 3.2 - Follow the instruction on the repo page: Change device_id, private_key using the information collected from step 2.4 and set the file type and path of the file to be uploaded to POT-IOT.  \n' +
        '\n' +
        '* 3.3 - Run "example.py" on the Raspberry PI and make sure it has access to the Internet. \n' +
        '\n' +
        '* 3.4 - If return code is 200, it means your device is successfully connected to POT-IOT platform and the file is uploaded. \n' +
        '\n' +
        '* 3.5 - If return code is other than 200, an error occured. Please check if your device ID, private key are correct and your device has access to the Internet.'
}

export const docDownload = {
    titleSection: 'Step 4 : Download data files on POT-IOT',
    stepDescription:
        '* 4.1 - Go back to POT-IOT device list page and click on the device which uploaded data file as the step 3. \n' +
        '\n' +
        '* 4.2 - On the detail page, you can find all the files uploaded. \n' +
        '\n' +
        '* 4.3 - Click "Download" button of the selected file to start download.'
}

export const docGitHub = {
    titleSection: 'GitHub Repo',
    stepDescription:
        '* https://github.com/Pot-IoT/potiot-example-raspberry-pi\n'
}

export const docEdit = {
    titleSection: 'Edit device information',
    stepDescription:
        ' 1) Choose a device that you want to manipulate with in Device List.\n' +
        '\n' +
        ' 2) Hover on that device and click to get into the deivce detail page.\n' +
        '\n' +
        ' 3) In the first section, you will be able to edit name and description for this specific device.'
}

export const docCommand = {
    titleSection: 'Send commands',
    stepDescription:
        ' 1) Choose a device that you want to manipulate with in Device List.\n' +
        '\n' +
        ' 2) Hover on that device and click to get into the deivce detail page.\n' +
        '\n' +
        ' 3) Scorll down to the second section, sending custom command divided by "," in String like.'
}

