import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image,SafeAreaView, ScrollView, Switch, StyleSheet, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const TelaInicial = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      const session = await AsyncStorage.getItem('govbr_session');
      if (session) {
        navigation.replace('Home');
      } else {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0047BB" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
 <View style={styles.configHeader}>

        <Image source={require('./assets/logo-gov.png')} style={styles.configLogo} />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('./assets/logo-som.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('./assets/logo-tema.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>      <View style={styles.header}>
        <Image source={require('./assets/logo-gov.png')} style={styles.govLogo} />
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Image source={require('./assets/logo-tema.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('./assets/logo-som.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.mainContent}>
        {/* Ícone do sol - parece ser um ícone acima do título na imagem 2 */}
        <View style={styles.iconContainer}>
          
          <Image source={require('./assets/logo.png')}  />
          <Text style={styles.subtitle}></Text>

        </View>
        
        {/* Título e subtítulo */}
        <Text style={styles.subtitle}>Um único login para todos os serviços públicos</Text>
        
        {/* Botão de login */}
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => navigation.navigate('TelaLogin')}
        >
          <Text style={styles.loginButtonText}>Entrar com gov.com.br</Text>
        </TouchableOpacity>
        
        {/* Separador */}
        <View style={styles.separator} />
        
        {/* Seção "Porque usar o SuperApp" */}
        <Text style={styles.sectionTitle}>Porque usar o SuperApp?</Text>
        
        {/* Ícones de serviços */}
        <View style={styles.serviceIcons}>
          <Image source={require('./assets/cadunico-logo.png')} style={styles.serviceIcon} />
          <Image source={require('./assets/meuinss-logo.png')} style={styles.serviceIcon} />
          <Image source={require('./assets/ctps-logo.png')} style={styles.serviceIcon} />
        </View>
        
        {/* Carrossel indicativo */}
        <View style={styles.carousel}>
          <View style={styles.carouselImage}>
            {/* Aqui você pode adicionar a imagem do carrossel */}
            <Image source={require('./assets/carrosel1.png')}  />
            
          </View>
          
          
          {/* Controles de navegação do carrossel */}
          <View style={styles.carouselControls}>
            <TouchableOpacity 
              style={styles.carouselArrow}
              onPress={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            >
              <Text style={styles.arrowText}>{'<'}</Text>
            </TouchableOpacity>
            <View style={styles.pageIndicators}>
              <View style={[styles.pageIndicator, currentPage === 0 && styles.activeIndicator]} />
              <View style={[styles.pageIndicator, currentPage === 1 && styles.activeIndicator]} />
              <View style={[styles.pageIndicator, currentPage === 2 && styles.activeIndicator]} />
            </View>
            <TouchableOpacity 
              style={styles.carouselArrow}
              onPress={() => setCurrentPage(prev => Math.min(2, prev + 1))}
            >
              <Text style={styles.arrowText}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Texto informativo */}
        <Text style={styles.infoText}>
          Todos os seus serviços do governo em um só app! Acesse Meu INSS, Cadastro Único, CTPS Digital e mais
        </Text>
      </View>
    </View>
  );
};

const TelaLogin = ({ navigation }) => {
  const loginURL = 'https://sso.acesso.gov.br/login?client_id=portal-logado.estaleiro.serpro.gov.br&authorization_id=1953e17e076';

  const handleNavigationStateChange = async (event) => {
    console.log("URL Atual:", event.url);
    if (event.url.includes('https://www.gov.br/portal-logado') || event.url.includes('https://sso.acesso.gov.br/authenticated') || event.url.includes('https://servicos.acesso.gov.br')) {
      await AsyncStorage.setItem('govbr_session', event.url);
      setTimeout(() => {
        navigation.replace('Home');
      }, 1000);
    }
  };

  return (
    
    <WebView 
      source={{ uri: loginURL }}
      style={{ flex: 1 }}
      onNavigationStateChange={handleNavigationStateChange} 
      sharedCookiesEnabled={true} 
      thirdPartyCookiesEnabled={true}
      startInLoadingState={true}
      renderLoading={() => <ActivityIndicator size="large" color="#007AFF" />}
    />
  );
};

const TelaHome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Logo, Title, and Theme buttons */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={24} color="#333" />
          </TouchableOpacity>
          <Image 
            source={require('./assets/logo-gov.png')} 
            style={styles.logoImage}
          />
        </View>
        
        <Text style={styles.headerTitle}>Tela Inicial</Text>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.themeButton}>
          <Image 
            source={require('./assets/logo-tema.png')} 
            style={styles.headerIcon}          />         
             </TouchableOpacity>
          <TouchableOpacity style={styles.accessibilityButton}>
          <Image 
            source={require('./assets/logo-som.png')} 
            style={styles.headerIcon}        
              />           </TouchableOpacity>
        </View>
      </View>
      
      {/* Main Content */}
      <ScrollView style={styles.contentContainer}>
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image source={require('./assets/noimage.png')} style={styles.profileImage} />
          </View>
          <Text style={styles.welcomeText}>Bem vindo</Text>
          <Text style={styles.profileName}>Marcelo Alves</Text>
          
          <View style={styles.profileInfoRow}>
            <Image source={require('./assets/nivel.png')} style={styles.infoIcon} />
            <Text style={styles.profileInfoText}>Nível da conta Gov: </Text>
            <Text style={styles.ouroText}>Ouro</Text>
            <TouchableOpacity>
              <Image source={require('./assets/info.png')} style={styles.infoButtonIcon} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfoRow}>
            <Image source={require('./assets/cpf.png')} style={styles.infoIcon} />
            <Text style={styles.profileInfoText}>CPF: 000.000.00-00</Text>
          </View>
          
          <View style={styles.profileInfoRow}>
            <Image source={require('./assets/email.png')} style={styles.infoIcon} />
            <Text style={styles.profileInfoText}>E-mail: emailTeste@email.com</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Serviços Disponíveis</Text>
        <Text style={styles.sectionSubtitle}>Serviços disponíveis baseados no nível Gov</Text>
        
        <View style={styles.servicesContainer}>
          <TouchableOpacity 
            style={styles.serviceButton} 
            onPress={() => navigation.navigate('WebView', { url: 'https://www.gov.br/pt-br/temas/meu-inss' })}
          >
            <Image source={require('./assets/meuinss-logo.png')} style={styles.serviceIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.serviceButton} 
            onPress={() => navigation.navigate('WebView', { url: 'https://cadunico.dataprev.gov.br/' })}
          >
            <Image source={require('./assets/cadunico-logo.png')} style={styles.serviceIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.serviceButton} 
            onPress={() => navigation.navigate('WebView', { url: 'https://servicos.mte.gov.br/spme-v2/#/login' })}
          >
            <Image source={require('./assets/ctps-logo.png')} style={styles.serviceIcon} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.serviceButton} 
            onPress={() => navigation.navigate('WebView', { url: 'https://servicos.acesso.gov.br' })}
          >
            <Image source={require('./assets/logo-gov.png')} style={styles.serviceIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('NotificacoesLista')}>
          <Ionicons name="notifications-outline" size={24} color="#666" />
          <Text style={styles.footerButtonText}>Notificações</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color="#0066cc" />
          <Text style={styles.footerButtonText}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Configurações')}>
          <Ionicons name="settings-outline" size={24} color="#666" />
          <Text style={styles.footerButtonText}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const TelaSair = ({ navigation }) => {
  useEffect(() => {
    const logout = async () => {
      await AsyncStorage.removeItem('govbr_session');
      navigation.replace('Inicial');
    };
    logout();
  }, []);
  
  return <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />;
};

// E no Drawer
const WebViewScreen = ({ route }) => {
  const url = route?.params?.url ?? 'https://www.gov.br';
  return (
    <WebView
      source={{ uri: url }}
      style={{ flex: 1 }}
      sharedCookiesEnabled={true}  
      thirdPartyCookiesEnabled={true}  
      startInLoadingState={true}
      renderLoading={() => <ActivityIndicator size="large" color="#007AFF" />}
    />
  );
};

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.header}>
    <Image source={require('./assets/logo-gov.png')} style={styles.govLogo} /></View>
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Image
        source={ require('./assets/logo.png') }
        style={{ width: 150, height: 100, marginBottom: 0 }}
        resizeMode="contain"
      />
      <Text style={{ color: '#666' }}>   Seleção de sistemas</Text>
    </View>

    {props.state.routes.map((route, index) => {
      if (props.descriptors[route.key].options.drawerLabel === null) {
        return null;
      }

      const isFocused = props.state.index === index;
      const label = route.name;

      const icons = {
        'Home': 'home',
        'Meu INSS': 'university',
        'CadÚnico': 'address-card',
        'Configurações': 'cog',
        'CTPS Digital': 'briefcase',
        'Sair': 'sign-out-alt'
      };

      return (
        
        <View key={route.key} style={{ marginVertical: 5 }}>
          
          <Text
            onPress={() => props.navigation.navigate(route.name)}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              color: props.state.index === index ? '#fff' : '#333',
              backgroundColor: props.state.index === index ? '#0B56C9' : 'transparent',
              borderRadius: 6,
              marginHorizontal: 10,
              fontWeight: 'bold',
              flexDirection: 'row',
              alignItems: 'center'
          }}>
            <Icon name={icons[route.name]} size={25} style={{ marginRight: 10 }} />
            {route.name}
          </Text>
        </View>
      );
    })}
  </DrawerContentScrollView>
);

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} initialRouteName="Home">
    
    <Drawer.Screen name="Home" component={TelaHome} />
    <Drawer.Screen name="Meu INSS" component={() => <WebViewScreen url='https://www.gov.br/pt-br/temas/meu-inss' />} />
    <Drawer.Screen name="CadÚnico" component={() => <WebViewScreen url='https://www.gov.br/pt-br/temas/cadastro-unico' />} />
    <Drawer.Screen name="CTPS Digital" component={() => <WebViewScreen url='https://www.gov.br' />} />
    <Drawer.Screen name="Configurações" component={TelaConfig} />
    <Drawer.Screen name="NotificacoesLista" component={TelaNotificacoesLista} options={{ drawerLabel: () => null }} />
    <Drawer.Screen name="Sair" component={TelaSair} />
  </Drawer.Navigator>
);


const TelaConfig = ({ navigation }) => {
  return (
    <View style={styles.configContainer}>
      <View style={styles.configHeader}>
        <Image source={require('./assets/logo-gov.png')} style={styles.configLogo} />
        <Text style={styles.configHeaderText}>Configurações</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('./assets/logo-som.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('./assets/logo-tema.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.configOption} 
        onPress={() => navigation.navigate('IdiomaRegiao')}
      >
        <View style={styles.optionIconContainer}>
          <Image source={require('./assets/logo-idioma.png')} style={[styles.optionIcon]} />
        </View>
        <Text style={styles.optionText}>Idioma e Região</Text>
        <Image source={require('./assets/logo-seta.png')} style={styles.arrowIcon} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.configOption}
        onPress={() => navigation.navigate('NotificacoesConfig')}
      >
        <View style={styles.optionIconContainer}>
          <Image source={require('./assets/logo-notificacoes.png')} style={[styles.optionIcon]} />
        </View>
        <Text style={styles.optionText}>Notificações</Text>
        <Image source={require('./assets/logo-seta.png')} style={styles.arrowIcon} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.configOption}
        onPress={() => navigation.navigate('LogoutAutomatico')}
      >
        <View style={styles.optionIconContainer}>
          <Image source={require('./assets/logo-logout.png')} style={[styles.optionIcon]} />
        </View>
        <Text style={styles.optionText}>Logout Automático</Text>
        <Image source={require('./assets/logo-seta.png')} style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );
};

// Tela de Idioma e Região
const TelaIdiomaRegiao = () => {
  const { t, currentLanguage, changeLanguage, getDisplayLanguage, getLanguageCode } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(getDisplayLanguage(currentLanguage));
  const [showOptions, setShowOptions] = useState(false);
  
  const handleLanguageSelect = (langDisplay) => {
    setSelectedLanguage(langDisplay);
    setShowOptions(false);
  };
  
  const handleSaveChanges = async () => {
    const langCode = getLanguageCode(selectedLanguage);
    const success = await changeLanguage(langCode);
    
    if (success) {
      Alert.alert(
        t('saveSuccess') || 'Sucesso',
        t('languageSaved') || 'Configurações de idioma salvas com sucesso!',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        t('error') || 'Erro',
        t('languageSaveError') || 'Erro ao salvar configurações de idioma.',
        [{ text: 'OK' }]
      );
    }
  };
  
  return (
    <View style={styles.configDetailContainer}>
      <View style={styles.configHeader}>
        <Image source={require('./assets/logo-gov.png')} style={styles.configLogo} />
        <Text style={styles.configHeaderText}>{t('headerTitle')}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('./assets/logo-som.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('./assets/logo-tema.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.configSection}>
        <Text style={styles.sectionTitle}>{t('sectionTitle')}</Text>
        <Text style={styles.sectionDescription}>
          {t('sectionDescription')}
        </Text>
        
        <Text style={styles.subsectionTitle}>{t('languageSelection')}</Text>
        
        <View style={styles.dropdownContainer}>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setShowOptions(!showOptions)}
          >
            <Text>{selectedLanguage}</Text>
            <Image source={require('./assets/logo-gov.png')} style={styles.dropdownIcon} />
          </TouchableOpacity>
        </View>
        
        {showOptions && (
          <View>
            <TouchableOpacity
              style={[styles.languageOption, selectedLanguage === 'Inglês' ? styles.selectedLanguage : null]}
              onPress={() => handleLanguageSelect('Inglês')}
            >
              <Text style={styles.languageText}>🇺🇸 {t('english')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.languageOption, selectedLanguage === 'Português (Padrão)' ? styles.selectedLanguage : null]}
              onPress={() => handleLanguageSelect('Português (Padrão)')}
            >
              <Text style={styles.languageText}>🇧🇷 {t('portuguese')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.languageOption, selectedLanguage === 'Español' ? styles.selectedLanguage : null]}
              onPress={() => handleLanguageSelect('Español')}
            >
              <Text style={styles.languageText}>🇪🇸 {t('spanish')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveChanges}
        >
          <Text style={styles.saveButtonText}>{t('saveButton')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Tela de Notificações
const TelaNotificacoes = () => {
  const [lembretes, setLembretes] = useState(true);
  const [alertas, setAlertas] = useState(true);
  const [prioritarias, setPrioritarias] = useState(true);
  
  return (
    <View style={styles.configDetailContainer}>
      <View style={styles.configHeader}>
        <Image source={require('./assets/logo-gov.png')} style={styles.configLogo} />
        <Text style={styles.configHeaderText}>Notificações</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('./assets/logo-som.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('./assets/logo-tema.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.configSection}>
        <Text style={styles.sectionTitle}>Tipos de Notificação</Text>
        <Text style={styles.sectionDescription}>
          Escolha quais notificações deseja receber, como lembretes, alertas e comunicados.
        </Text>
        
        <View style={styles.notificationOption}>
          <View style={styles.notificationInfo}>
            <View style={[styles.notificationDot, {backgroundColor: '#FFA000'}]} />
            <Text style={styles.notificationText}>Lembretes</Text>
          </View>
          <Switch
            value={lembretes}
            onValueChange={setLembretes}
            trackColor={{ false: '#CCCCCC', true: '#0047BB' }}
            thumbColor="#FFFFFF"
          />
        </View>
        
        <View style={styles.notificationOption}>
          <View style={styles.notificationInfo}>
            <View style={[styles.notificationDot, {backgroundColor: '#C62828'}]} />
            <Text style={styles.notificationText}>Alertas</Text>
          </View>
          <Switch
            value={alertas}
            onValueChange={setAlertas}
            trackColor={{ false: '#CCCCCC', true: '#0047BB' }}
            thumbColor="#FFFFFF"
          />
        </View>
        
        <View style={styles.notificationOption}>
          <View style={styles.notificationInfo}>
            <Text style={styles.notificationText}>Notificações Prioritárias</Text>
          </View>
          <Switch
            value={prioritarias}
            onValueChange={setPrioritarias}
            trackColor={{ false: '#CCCCCC', true: '#0047BB' }}
            thumbColor="#FFFFFF"
          />
        </View>
        
        <Text style={[styles.sectionTitle, {marginTop: 20}]}>Configurações dos Horários</Text>
        <Text style={styles.sectionDescription}>
          Defina horários específicos para receber notificações e evitar interrupções.
        </Text>
        
        <TouchableOpacity style={styles.timeSelector}>
          <Text>Selecione o horário inicial</Text>
          <Image source={require('./assets/logo-gov.png')} style={styles.timeIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.timeSelector}>
          <Text>Selecione o horário final</Text>
          <Image source={require('./assets/logo-som.png')} style={styles.timeIcon} />
        </TouchableOpacity>
        
        <View style={styles.notificationOption}>
          <View style={styles.notificationInfo}>
            <Image source={require('./assets/logo-tema.png')} style={styles.silentIcon} />
            <Text style={styles.notificationText}>Modo não perturbe</Text>
          </View>
          <Switch
            trackColor={{ false: '#CCCCCC', true: '#0047BB' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Tela de Logout Automático
const TelaLogoutAutomatico = () => {
  const [selectedTime, setSelectedTime] = useState('30min');
  const [inactivityAlert, setInactivityAlert] = useState(true);
  
  return (
    <View style={styles.configDetailContainer}>
      <View style={styles.configHeader}>
        <Image source={require('./assets/logo-gov.png')} style={styles.configLogo} />
        <Text style={styles.configHeaderText}>Logout Automático</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('./assets/logo-som.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('./assets/logo-tema.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.configSection}>
        <Text style={styles.sectionTitle}>Tempo de Inatividade</Text>
        <Text style={styles.sectionDescription}>
          Defina o tempo de inatividade antes do logout automático.
        </Text>
        
        <Text style={styles.subsectionTitle}>Selecione o tempo</Text>
        
        <View style={styles.dropdownContainer}>
          <TouchableOpacity style={styles.dropdown}>
            <Text>{selectedTime}</Text>
            <Image source={require('./assets/icon.png')} style={styles.dropdownIcon} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.notificationOption}>
          <Text style={styles.notificationText}>Aviso de Inatividade</Text>
          <Switch
            value={inactivityAlert}
            onValueChange={setInactivityAlert}
            trackColor={{ false: '#CCCCCC', true: '#0047BB' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Tela de Notificações com Lista
const TelaNotificacoesLista = () => {
  return (
    <View style={styles.configDetailContainer}>
      <View style={styles.configHeader}>
        <Image source={require('./assets/logo.png')} style={styles.configLogo} />
        <Text style={styles.configHeaderText}>Notificações</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('./assets/icon.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('./assets/icon.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.notificationsList}>
        <View style={styles.notificationItem}>
          <View style={styles.notificationCircle}>
            <Image source={require('./assets/icon.png')} style={styles.notificationItemIcon} />
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>Pendência no CadÚnico</Text>
            <Text style={styles.notificationDesc}>Atualize seus dados até 30/04 - há 5 dias</Text>
          </View>
        </View>
        
        <View style={styles.notificationItem}>
          <View style={[styles.notificationCircle, {backgroundColor: '#4CAF50'}]}>
            <Image source={require('./assets/icon.png')} style={styles.notificationItemIcon} />
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>Benefício Aprovado</Text>
            <Text style={styles.notificationDesc}>Seu INSS foi liberado! - há 5 dias</Text>
          </View>
        </View>
        
        <View style={styles.notificationItem}>
          <View style={[styles.notificationCircle, {backgroundColor: '#FFA000'}]}>
            <Image source={require('./assets/icon.png')} style={styles.notificationItemIcon} />
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>Atualização na CTPS</Text>
            <Text style={styles.notificationDesc}>Vencimento em 30 dias - há 3 horas</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Limpar Notificações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default function App() {
  return (
    <LanguageProvider>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="LogoutAutomatico" component={TelaLogoutAutomatico} options={{ headerShown: false }} />
        <Stack.Screen name="Inicial" component={TelaInicial} options={{ headerShown: false }} />
        <Stack.Screen name="NotificacoesConfig" component={TelaNotificacoes} options={{ headerShown: false }} />
        <Stack.Screen name="IdiomaRegiao" component={TelaIdiomaRegiao} options={{ headerShown: false }} />

        <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 70,
    height: 24,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeButton: {
    padding: 8,
    marginRight: 5,
  },
  accessibilityButton: {
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  profileCard: {
    backgroundColor: '#1a73e8',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  profileName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  infoButtonIcon: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
  profileInfoText: {
    color: '#fff',
    fontSize: 14,
  },
  ouroText: {
    color: '#ffd700',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
    height: 60,
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  govLogo: {
    width: 60,
    height: 20,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconMode: {
    width: 24,
    height: 24,
    tintColor: '#0047BB',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  sunIcon: {
    width: 28,
    height: 28,
    tintColor: '#0047BB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0047BB',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#0047BB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    width: '100%',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  serviceIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  carousel: {
    width: '100%',
    marginBottom: 16,
  },
  carouselImage: {
    height: 120,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  carouselPlaceholder: {
    width: 48,
    height: 48,
    tintColor: '#CCCCCC',
  },
  carouselControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666666',
  },
  pageIndicators: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  pageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#0047BB',
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileCard: {
    backgroundColor: '#1351b4',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ffffff'
  },
  profileInfo: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 4,
  },
  profileOuro: {
    fontSize: 14,
    color: '#ffa80c',
    marginBottom: 4,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  serviceButton: {
    backgroundColor: '#FFFFFF',
    width: '30%',
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    padding: 8,
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },  
  // Estilos para a tela principal de configurações
  configContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  configHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  configLogo: {
    width: 60,
    height: 20,
    resizeMode: 'contain',
  },
  configHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginLeft: 12,
  },
  configOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  optionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  optionIcon: {
    width: 20,
    height: 20,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
  
  // Estilos para as telas de detalhe de configuração
  configDetailContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  configSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  dropdownIcon: {
    width: 16,
    height: 16,
    tintColor: '#999999',
  },
  languageOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  selectedLanguage: {
    backgroundColor: '#F5F5F5',
  },
  languageText: {
    fontSize: 16,
    color: '#333333',
  },
  buttonContainer: {
    padding: 16,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#0047BB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Estilos para notificações
  notificationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  notificationText: {
    fontSize: 16,
    color: '#333333',
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 12,
    marginVertical: 8,
  },
  timeIcon: {
    width: 16,
    height: 16,
    tintColor: '#999999',
  },
  silentIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  
  // Estilos para lista de notificações
  notificationsList: {
    flex: 1,
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  notificationCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationItemIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  notificationDesc: {
    fontSize: 14,
    color: '#666666',
  },
  clearButton: {
    backgroundColor: '#0047BB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const additionalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  govLogo: {
    width: 60,
    height: 20,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconMode: {
    width: 24,
    height: 24,
    tintColor: '#0047BB',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  sunIcon: {
    width: 28,
    height: 28,
    tintColor: '#0047BB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0047BB',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#0047BB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    width: '100%',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  serviceIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  carousel: {
    width: '100%',
    marginBottom: 16,
  },
  carouselImage: {
    height: 120,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  carouselPlaceholder: {
    width: 48,
    height: 48,
    tintColor: '#CCCCCC',
  },
  carouselControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666666',
  },
  pageIndicators: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  pageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#0047BB',
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  profileInfo: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  serviceButton: {
    backgroundColor: '#FFFFFF',
    width: '30%',
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    padding: 8,
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});