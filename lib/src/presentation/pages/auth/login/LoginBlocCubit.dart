import 'package:aplicacionuno/src/presentation/pages/auth/login/LoginBlocState.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rxdart/rxdart.dart';

class LoginBlocCubit extends Cubit<LoginBlocState> {
  LoginBlocCubit() : super(LoginInitial());
  //Tipos de datos que vamos a capturar
  final _emailController = BehaviorSubject<String>();
  final _passwordController = BehaviorSubject<String>();
  //lo que vamos a obtener
  //un Stream es una fuente de datos asincrónica que emite eventos a lo largo del tiempo.
  Stream<String> get emailStream => _emailController.stream;
  Stream<String> get passwordStream => _passwordController.stream;

//Validación 1
  void changeEmail(String email) {
    if (email.isNotEmpty && email.length <= 3)
    {
      _emailController.sink.addError('La longitud de caracteres debe ser mayor o igual a 3' );
    }
    else {
      _emailController.sink.add(email);//aqui entra la información del email
    }
  }
//Validación 2
  void changePassword(String password) {
    if (password.isNotEmpty && password.length <=3) {
      _passwordController.sink.addError('El password debe de tener al menos 3 caracteres' );
    } else {
      _passwordController.sink.add(password);
    }
  }

  //Combinar 2 string
  //Si pasa las dos validaciones anteriores, el formulario es válido
  Stream<bool> get validateForm =>
      Rx.combineLatest2(emailStream, passwordStream, (a, b) => true);

  void dispose(){//se ejecuta cuando pasemos a otra pantalla, se reiniciarán ambos valores
    changeEmail('');
    changePassword('');
  }

  void login() {
    print('Email:${_emailController.value}');
    print('Password:${_passwordController.value}');
  }
}
