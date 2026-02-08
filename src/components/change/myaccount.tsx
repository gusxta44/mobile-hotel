import { useState } from 'react';
import {Modal,Text,TouchableOpacity,View,StyleSheet,Alert,} from 'react-native';
import AuthContainer from '../ui/AuthContainer';
import PasswordField from '../ui/PasswordField';
import TextField from '../ui/TextField';
import { global } from '../ui/styles';

    const ChangePasswordModal = ({ visible, onClose }: {
    visible: boolean;
    onClose: () => void;
    }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const resetAndClose = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onClose();
    };

    const handleChangePassword = () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
        Alert.alert('preencha todos os campos');
        return;
        }

        if (newPassword !== confirmPassword) {
        Alert.alert('as senhas não coincidem');
        return;
        }

        Alert.alert('senha alterada com sucesso!');
        resetAndClose();
    };

    return (
        <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={resetAndClose}
        >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
            <PasswordField
                label="Senha atual"
                value={oldPassword}
                onChangeText={setOldPassword}
            />

            <PasswordField
                label="Nova senha"
                value={newPassword}
                onChangeText={setNewPassword}
            />

            <PasswordField
                label="Confirmar nova senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleChangePassword}
            >
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={resetAndClose}
                >
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>
    );
};

const RenderMyAccount: React.FC = () => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const testeUser = {
    name: 'gustavo aaaaaaaaa',
    email: 'gustavo@gmail.com',
    cpf: '124.345.876-05',
    phone: '(11) 9837372382',
    };

    const [name, setName] = useState(testeUser.name);
    const [email, setEmail] = useState(testeUser.email);
    const [cpf, setCpf] = useState(testeUser.cpf);
    const [phone, setPhone] = useState(testeUser.phone);

    const maskPhone = (value: string) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
    };
    const maskCpf = (value: string) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14);    
    }
    
    return (
        <AuthContainer
        title="Minha Conta"
        subtitle="Altere ou consulte seus dados cadastrais"
        >
        <View style={global.container}>
            <TextField
            label="Nome de Usuário"
            value={name}
            style={{backgroundColor: '#f8f6f6', borderRadius: 4, height: 40}}
            onChangeText={(input) => setName(input)}
            />

            <TextField
            label="CPF"
            value={maskCpf(cpf)}
            style={{backgroundColor: '#f8f6f6', borderRadius: 4, height: 40}}
            onChangeText={(input) => setCpf(input)}
            />

            <TextField
            label="Email"
            value={email}
            style={{backgroundColor: '#f8f6f6', borderRadius: 4, height: 40}}
            onChangeText={(input) => setEmail(input)}
            />

            <TextField
            label="Telefone"
            value={maskPhone(phone)}
            style={{backgroundColor: '#f8f6f6', borderRadius: 4, height: 40}}
            onChangeText={(input) => setPhone(input)}
            />

            <TouchableOpacity style={[styles.primaryButton, { marginBottom: 12 , marginTop: 24}]}>
            <Text style={styles.buttonText}>Alterar dados</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setShowPasswordModal(true)}
            >
            <Text style={styles.buttonText}>Trocar senha</Text>
            </TouchableOpacity>
        </View>

        <ChangePasswordModal
            visible={showPasswordModal}
            onClose={() => setShowPasswordModal(false)}
        />
        </AuthContainer>
    );
};

export default RenderMyAccount;

    const styles = StyleSheet.create({
    primaryButton: {
        backgroundColor: '#14addc',
        padding: 14,
        borderRadius: 6,
        alignItems: 'center',
    },
    secondaryButton: {
        backgroundColor: '#fd271f',
        padding: 14,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#f8f5f5',
        borderRadius: 8,
        padding: 20,
        gap: 16,
    },
    cancelText: {
        textAlign: 'center',
        color: '#141414',
        marginTop: 8,
    },
});