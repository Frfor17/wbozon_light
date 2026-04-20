import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Key, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TokenSetupProps {
    onComplete: (tokens: { wb: string; ozon: string }) => void;
    onBack: () => void;
}

const { width } = Dimensions.get('window');

export default function TokenSetup({ onComplete, onBack }: TokenSetupProps) {
    const router = useRouter();
    const [wbToken, setWbToken] = useState('');
    const [ozonToken, setOzonToken] = useState('');
    const [step, setStep] = useState<'wb' | 'ozon'>('wb');
    const [errors, setErrors] = useState({ wb: '', ozon: '' });

    const validateToken = (token: string) => {
        if (token.length < 10) return 'Token должен быть минимум 10 символов';
        return '';
    };

    const handleWbNext = () => {
        const error = validateToken(wbToken);
        if (error) {
            setErrors({ ...errors, wb: error });
            return;
        }
        setErrors({ ...errors, wb: '' });
        setStep('ozon');
    };

    const handleOzonSubmit = async () => {
        const error = validateToken(ozonToken);
        if (error) {
            setErrors({ ...errors, ozon: error });
            return;
        }
        setErrors({ ...errors, ozon: '' });
        // ✅ Сохраняем токены WB/Ozon
        await AsyncStorage.setItem('tokens', JSON.stringify({
            wb: wbToken,
            ozon: ozonToken
        }));

        // ✅ Переход на tabs (Dashboard)
        router.replace('/(tabs)');
    };

    return (
        <LinearGradient colors={['#eff6ff', '#e0e7ff']} style={styles.container}>
            <View style={styles.card}>
                {/* Progress */}
                <View style={styles.progressRow}>
                    <View style={[styles.progressStep, step === 'wb' ? styles.activeStep : styles.completeStep]}>
                        <Text style={styles.stepNumber}>{step === 'wb' ? '1' : <CheckCircle size={20} />}</Text>
                        <Text style={[styles.stepLabel, step === 'wb' ? styles.activeLabel : styles.completeLabel]}>Wildberries</Text>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, step === 'ozon' && styles.progressFillComplete]} />
                    </View>
                    <View style={[styles.progressStep, step === 'ozon' ? styles.activeStep : styles.inactiveStep]}>
                        <Text style={styles.stepNumber}>2</Text>
                        <Text style={[styles.stepLabel, step === 'ozon' ? styles.activeLabel : styles.inactiveLabel]}>Ozon</Text>
                    </View>
                </View>

                {step === 'wb' ? (
                    <>
                        <View style={styles.iconWrap}>
                            <Key size={32} color="#8b5cf6" />
                        </View>
                        <Text style={styles.title}>Подключить Wildberries</Text>
                        <Text style={styles.subtitle}>Введите API токен вашего продавца</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>WB API Token</Text>
                            <TextInput
                                style={[styles.input, errors.wb && styles.inputError]}
                                value={wbToken}
                                onChangeText={setWbToken}
                                placeholder="Введите токен Wildberries"
                                secureTextEntry
                            />
                            {errors.wb && (
                                <View style={styles.errorRow}>
                                    <AlertCircle size={16} color="#ef4444" />
                                    <Text style={styles.errorText}>{errors.wb}</Text>
                                </View>
                            )}
                            <Text style={styles.helpText}>ЛК WB → Настройки → API</Text>
                        </View>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
                                <ArrowLeft size={20} color="#6b7280" />
                                <Text style={styles.backBtnText}>Назад</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.nextBtn} onPress={handleWbNext}>
                                <Text style={styles.nextBtnText}>Далее</Text>
                                <ArrowRight size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.iconWrap}>
                            <Key size={32} color="#3b82f6" />
                        </View>
                        <Text style={styles.title}>Подключить Ozon</Text>
                        <Text style={styles.subtitle}>Введите API токен для завершения настройки</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Ozon API Token</Text>
                            <TextInput
                                style={[styles.input, errors.ozon && styles.inputError]}
                                value={ozonToken}
                                onChangeText={setOzonToken}
                                placeholder="Введите токен Ozon"
                                secureTextEntry
                            />
                            {errors.ozon && (
                                <View style={styles.errorRow}>
                                    <AlertCircle size={16} color="#ef4444" />
                                    <Text style={styles.errorText}>{errors.ozon}</Text>
                                </View>
                            )}
                            <Text style={styles.helpText}>ЛК Ozon → Настройки → API ключи</Text>
                        </View>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.backBtn} onPress={() => setStep('wb')}>
                                <ArrowLeft size={20} color="#6b7280" />
                                <Text style={styles.backBtnText}>Назад</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.nextBtn, styles.completeBtn]} onPress={handleOzonSubmit}>
                                <Text style={styles.completeBtnText}>Завершить</Text>
                                <CheckCircle size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    progressStep: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        flex: 1,
    },
    activeStep: {
        // Активный шаг
    },
    completeStep: {
        // Завершённый
    },
    inactiveStep: {
        opacity: 0.5,
    },
    stepNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#e0e7ff',
        color: '#4f46e5',
        textAlign: 'center',
        lineHeight: 32,
        fontWeight: '700',
    },
    stepLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    activeLabel: {
        color: '#4f46e5',
    },
    completeLabel: {
        color: '#10b981',
    },
    inactiveLabel: {
        color: '#9ca3af',
    },
    progressBar: {
        flex: 1,
        height: 4,
        backgroundColor: '#e5e7eb',
        borderRadius: 2,
        marginHorizontal: 16,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#e5e7eb',
        width: 0,
    },
    progressFillComplete: {
        backgroundColor: '#4f46e5',
        width: '100%',
    },
    iconWrap: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#f3e8ff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1e1b4b',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: '#f87171',
    },
    errorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 14,
    },
    helpText: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 8,
        lineHeight: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    backBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    backBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6b7280',
    },
    nextBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#4f46e5',
    },
    nextBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    completeBtn: {
        backgroundColor: '#10b981',
    },
    completeBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});