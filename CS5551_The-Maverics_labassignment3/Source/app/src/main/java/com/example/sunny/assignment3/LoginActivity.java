package com.example.sunny.assignment3;

import android.content.Intent;
import android.os.PatternMatcher;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;

import java.util.regex.Pattern;


public class LoginActivity extends AppCompatActivity {
    LoginButton loginButton;
    CallbackManager callbackManager;
    EditText uname,password;
    Button loginbtn,registerbtn;
    TextView lgnerrmsg;
    FirebaseAuth firebaseAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FacebookSdk.sdkInitialize(getApplicationContext());
        setContentView(R.layout.activity_login);
        firebaseAuth = FirebaseAuth.getInstance();
        loginButton = (LoginButton)findViewById(R.id.login_button);
        callbackManager=CallbackManager.Factory.create();
        uname=(EditText)findViewById(R.id.txt_uname);
        password=(EditText)findViewById(R.id.txt_pwd);
        loginbtn=(Button)findViewById(R.id.btn_lgn);
        registerbtn=(Button)findViewById(R.id.btn_register);
        lgnerrmsg=(TextView)findViewById(R.id.txtmessage);

         loginButton.registerCallback(callbackManager, new FacebookCallback<LoginResult>() {

             @Override
             public void onSuccess(LoginResult loginResult) {
                 startActivity(new Intent(LoginActivity.this, HomeActivity.class));
             }

             @Override
             public void onCancel() {

             }

             @Override
             public void onError(FacebookException error) {

             }
         });

        loginbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String usernamelgn = uname.getText().toString();
                String passwordlgn = password.getText().toString();
                String emailpattern = "^(.+)@(.+)$";
                String pattern ="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}";

                //Validation if username or password is empty

                if (usernamelgn.isEmpty() || passwordlgn.isEmpty() ) {
                    lgnerrmsg.setText("Username or Password cannot be empty");
                    lgnerrmsg.setVisibility(View.VISIBLE);
                    // return;
                }
                else if(!Pattern.matches(emailpattern,usernamelgn)){
                    lgnerrmsg.setText("Invalid email format");
                    lgnerrmsg.setVisibility(View.VISIBLE);
                }
                else{
                    firebaseAuth.signInWithEmailAndPassword(usernamelgn,passwordlgn).addOnCompleteListener(LoginActivity.this, new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(@NonNull Task<AuthResult> task) {
                            if(task.isSuccessful()){
                                Toast.makeText(LoginActivity.this, "Login Successfully", Toast.LENGTH_SHORT).show();
                                startActivity(new Intent(LoginActivity.this, HomeActivity.class));
                            }
                            else {
                                Toast.makeText(LoginActivity.this, "Login Failed", Toast.LENGTH_SHORT).show();
                            }
                        }
                    });
                }

            }
        });

        registerbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
              startActivity(new Intent(LoginActivity.this, RegisterActivity.class));
            }
        });







    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        callbackManager.onActivityResult(requestCode, resultCode, data);
    }


}
