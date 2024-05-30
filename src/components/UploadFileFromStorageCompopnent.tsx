import {Slider} from '@miblanchard/react-native-slider';
import storage from '@react-native-firebase/storage';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Modal, TouchableOpacity, View} from 'react-native';
import {
  DocumentPickerResponse,
  pick,
  types,
} from 'react-native-document-picker';
import {colors} from '../constants/colors';
import {calFileSize, image} from '../constants/const';
import {fonts} from '../constants/fontFamily';
import {AttachmentModel} from '../model/TaskModel';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
interface Props {
  onchangeFile: (file: AttachmentModel) => void;
}
const UploadFileFromStorageCompopnent = (props: Props) => {
  const {onchangeFile} = props;
  const [files, setfiles] = useState<DocumentPickerResponse>();

  const [progressUpload, setprogressUpload] = useState(0);

  const [isvissibleModal, setisvissibleModal] = useState(false);

  const [attachmentFile, setattachmentFile] = useState<AttachmentModel>();
  useEffect(() => {
    files && handleUpLoadFile();
  }, [files]);

  useEffect(() => {
    if (attachmentFile) {
      console.log(attachmentFile);
      onchangeFile(attachmentFile);
      setisvissibleModal(false);
    }
  }, [attachmentFile]);

  const handleUpLoadFile = async () => {
    if (files) {
      setisvissibleModal(true);
      const path = `documents/${files.name}`;

      const res = await storage().ref(path).putFile(files.uri);
      setprogressUpload(res.bytesTransferred / res.totalBytes);
      storage()
        .ref(path)
        .getDownloadURL()
        .then(url => {
          const data: AttachmentModel = {
            name: files.name ?? '',
            url,
            size: files.size ?? 0,
          };

          setattachmentFile(data);
        })
        .catch(error => console.log(error.message));
    }
  };
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          pick({allowMultiSelection: false, type: [types.pdf, types.doc]})
            .then(res => setfiles(res[0]))
            .catch(error => console.log(error.mesSage))
        }>
        <Image source={image.imgaddfile} style={{width: 40, height: 40}} />
      </TouchableOpacity>

      <Modal
        visible={isvissibleModal}
        animationType="slide"
        transparent
        statusBarTranslucent>
        <View
          style={{
            flex: 1,
            backgroundColor: `${colors.bgcolor}A1`,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: Dimensions.get('window').width * 0.8,
              borderRadius: 12,
              paddingHorizontal: 12,
              height: 'auto',
            }}>
            <TextComponent
              text="Uploading"
              color={colors.gray}
              size={18}
              style={{paddingBottom: 20}}
              font={fonts.bold}
            />

            <TextComponent text={files?.name ?? ''} color={colors.gray} />
            <TextComponent
              text={`${calFileSize(files?.size ?? 0)}`}
              color={colors.gray}
            />

            <RowComponent>
              <View style={{flex: 1, paddingRight: 10}}>
                <Slider
                  disabled
                  value={progressUpload}
                  renderThumbComponent={() => null}
                  minimumTrackTintColor={colors.green}
                  maximumTrackStyle={{borderRadius: 100}}
                  minimumTrackStyle={{padding: 5, borderRadius: 100}}
                />
              </View>
              <TextComponent
                text={`${Math.floor(progressUpload * 100)}%`}
                color={colors.bgcolor}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default UploadFileFromStorageCompopnent;
