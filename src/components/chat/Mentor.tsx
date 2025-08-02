import { COLOR } from '@/styles/color/color';
import { Text, View } from 'react-native';

type Props = {
  message: string;
  name: string;
};

const Mentor = ({ message, name }: Props) => {
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          backgroundColor: COLOR.stroke,
          borderRadius: 135135,
        }}
      />

      <View style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Text style={{ fontSize: 12 }}>{name}</Text>

        <Text
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            backgroundColor: COLOR.main,
            borderRadius: 8,
          }}
        >
          {message}
        </Text>
      </View>
    </View>
  );
};

export default Mentor;
