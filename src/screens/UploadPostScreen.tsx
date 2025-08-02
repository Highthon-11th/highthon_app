import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import searchIcon from '../../assets/camera.png';
import { COLOR } from '@/styles/color/color';
import { body1 } from '@/styles/typography/body';
import { title2, title3 } from '@/styles/typography/title';
import Header from '@/components/Header';
import TagList from '@components/tag/TagList.tsx';
import { ImageAsset } from '@lib/types/Image.ts';
import { authClient } from '@lib/client';
import { login } from '@lib/api/auth.ts';

const { width } = Dimensions.get('window');

const UploadPostScreen = () => {
  const [isInfo, setIsInfo] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<ImageAsset[]>([]);

  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const openGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
      quality: 0.8,
      maxWidth: 1000,
      maxHeight: 1000,
      selectionLimit: 5, // 최대 5장까지
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        const newImages: ImageAsset[] = response.assets
          .filter(asset => asset.uri)
          .map(asset => ({
            uri: asset.uri!,
            name: asset.fileName!,
            type: asset.type!,
          }));
        setSelectedImages(prev => [...prev, ...newImages]);
      }
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const renderUploadSection = () => {
    if (selectedImages.length === 0) {
      return (
        <TouchableOpacity style={styles.uploadContainer} onPress={openGallery}>
          <Image source={searchIcon} style={styles.photo} />
          <View style={{ height: 12 }} />
          <Text style={body1}>사진 추가하기</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View>
        <View style={styles.imageGrid}>
          {selectedImages.map((image, index: number) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: image.uri }} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index)}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {selectedImages.length < 5 && (
          <TouchableOpacity style={styles.addMoreButton} onPress={openGallery}>
            <Text style={styles.addMoreText}>
              + 사진 더 추가하기 ({selectedImages.length}/5)
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="글 작성" />
      <ScrollView style={styles.wrapper}>
        <View style={styles.contentWrap}>
          {renderUploadSection()}

          <View style={styles.categorySection}>
            <Text style={title2}>카테고리</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setIsInfo(true)}
              >
                <View
                  style={[
                    styles.toggleButtonInner,
                    { backgroundColor: isInfo ? COLOR.main : 'transparent' },
                  ]}
                >
                  <Text
                    style={[title3, { color: isInfo ? 'white' : COLOR.stroke }]}
                  >
                    정보
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setIsInfo(false)}
              >
                <View
                  style={[
                    styles.toggleButtonInner,
                    { backgroundColor: !isInfo ? COLOR.main : 'transparent' },
                  ]}
                >
                  <Text
                    style={[
                      title3,
                      { color: !isInfo ? 'white' : COLOR.stroke },
                    ]}
                  >
                    질문
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.categorySection}>
            <Text style={title2}>해시태그</Text>
            <View style={{ height: 12 }} />
            <TagList
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </View>

          <View style={styles.categorySection}>
            <Text style={title2}>제목</Text>
            <View style={{ height: 12 }} />
            <TextInput
              placeholder="제목을 입력해주세요."
              value={title}
              onChangeText={setTitle}
              style={styles.searchbar}
            />
          </View>

          <View style={styles.categorySection}>
            <Text style={title2}>내용</Text>
            <View style={{ height: 12 }} />
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="내용을 입력해주세요."
              style={styles.textContainer}
              multiline={true}
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={async () => {
            const body = new FormData();
            body.append('title', title);
            body.append('content', content);
            body.append('type', 'INFORMATION');
            selectedTags.forEach(tag => {
              body.append(`tagIdList`, tag.toString());
            });

            // body.append('image', selectedImages[0]);
            console.log('login start');

            await login();

            console.log('login success');

            authClient
              .postForm('/post/create', body)
              .then(res => {
                console.log('res', res.data);
              })
              .catch(err => console.error(err));
          }}
        >
          <Text style={styles.submitButtonText}>게시하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentWrap: {
    flex: 1,
  },
  uploadContainer: {
    width: '100%',
    height: 182,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: COLOR.stroke,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 32,
    borderStyle: 'dashed',
  },
  photo: {
    width: 24,
    height: 22,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  imageContainer: {
    width: (width - 50) / 3,
    height: (width - 50) / 3,
    marginBottom: 10,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addMoreButton: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLOR.stroke,
    borderStyle: 'dashed',
  },
  addMoreText: {
    fontSize: 14,
    color: COLOR.stroke,
    fontWeight: '500',
  },
  categorySection: {
    marginBottom: 24,
  },
  toggleContainer: {
    width: '100%',
    height: 40,
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: COLOR.stroke,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 8,
  },
  toggleButton: {
    flex: 1,
    height: '100%',
  },
  toggleButtonInner: {
    flex: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  searchbar: {
    padding: 12,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  textContainer: {
    minHeight: 120,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 12,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  submitButton: {
    height: 50,
    width: '100%',
    backgroundColor: COLOR.main,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default UploadPostScreen;
