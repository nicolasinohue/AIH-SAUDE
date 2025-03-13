import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardPaciente from './screens/DashboardPaciente';
import DashboardMedico from './screens/DashboardMedico';
import LoginScreen from './screens/LoginScreen';
import DetalhesProcedimento from './screens/DetalhesProcedimento';
import AgendamentoConsulta from './screens/AgendamentoConsulta';
import ConsultasMedico from './screens/ConsultasMedico';
import UploadReceita from './screens/UploadReceita';
import ConsultasPaciente from './screens/ConsultasPaciente';
import RegisterScreen from './screens/RegisterScreen';
import EditarConsulta from './screens/EditarConsulta';
import EsqueciSenha from './screens/EsqueciSenha';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PacienteTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardPaciente} options={{
            tabBarIcon: () => <Entypo name="fingerprint" size={20}/>
          }}>
      </Tab.Screen>
      <Tab.Screen name="Agendamento" component={AgendamentoConsulta} options={{
            tabBarIcon: () => <Entypo name="open-book" size={20}/>
          }}>
      </Tab.Screen>
      <Tab.Screen name="Consultas" component={ConsultasPaciente} options={{
            tabBarIcon: () => <Entypo name="drop" size={20}/>
          }}>
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function MedicoTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardMedico} options={{
            tabBarIcon: () => <Entypo name="fingerprint" size={20}/>
          }}>
      </Tab.Screen>

      <Tab.Screen name="Upload Receita" component={UploadReceita} options={{
            tabBarIcon: () => <Entypo name="news" size={20}/>
          }}>
      </Tab.Screen>
      <Tab.Screen name="Suas Consultas" component={ConsultasMedico} options={{
            tabBarIcon: () => <Entypo name="man" size={20}/>
          }}>
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        <Stack.Screen name="Paciente" component={PacienteTabNavigator} />
        <Stack.Screen name="Medico" component={MedicoTabNavigator} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />
        <Stack.Screen name="Editar Consulta" component={EditarConsulta} />
        <Stack.Screen name="Detalhes Procedimento" component={DetalhesProcedimento} />
        <Stack.Screen name="Consultas Medico" component={ConsultasMedico} />
        <Stack.Screen name="Upload Receita" component={UploadReceita} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;