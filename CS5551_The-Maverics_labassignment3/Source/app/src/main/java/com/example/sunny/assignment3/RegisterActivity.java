package com.example.sunny.assignment3;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;

import java.util.regex.Pattern;

/**
 * Created by sunny on 2/25/2018.
 */

public class RegisterActivity extends AppCompatActivity {

    EditText inuname,inpwd,incpwd;
    Button reg,loginlink;
    TextView messagerr;
     FirebaseAuth firebaseAuth;
    ProgressDialog progressDialog;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
firebaseAuth = FirebaseAuth.getInstance();
progressDialog = new ProgressDialog(this);
        inuname=(EditText)findViewById(R.id.input_uname);
        inpwd=(EditText)findViewById(R.id.input_pwd);
        incpwd=(EditText)findViewById(R.id.input_cnfmpwd);
        reg=(Button)findViewById(R.id.btn_signup);
        loginlink=(Button)findViewById(R.id.login_link);
        messagerr=(TextView)findViewById(R.id.errmessage);



     loginlink.setOnClickListener(new View.OnClickListener() {
         @Override
         public void onClick(View view) {
             startActivity(new Intent(RegisterActivity.this, LoginActivity.class));
         }
     });

     reg.setOnClickListener(new View.OnClickListener() {
         @Override
         public void onClick(View view) {
             String usernme = inuname.getText().toString();
             String passwd = inpwd.getText().toString();
             String cnfpwd = incpwd.getText().toString();
             String emailpattern = "^(.+)@(.+)$";
             //String pattern ="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}";
            /* if(!Pattern.matches(pattern, passwd)){
                 messagerr.setText("Invalid password format");
                 messagerr.setVisibility(View.VISIBLE);
             }
             else */
             if(usernme.isEmpty() ||  passwd.isEmpty() || cnfpwd.isEmpty()){
                 messagerr.setText("All fields must entered");
                 messagerr.setVisibility(View.VISIBLE);
             }
            else if(!Pattern.matches(emailpattern, usernme)){
                 messagerr.setText("Invalid email format");
                 messagerr.setVisibility(View.VISIBLE);
             }
             else if(!passwd.equals(cnfpwd)){
                 messagerr.setText("Password and Confirm Password must be equal");
                 messagerr.setVisibility(View.VISIBLE);
             }


             else{
                 firebaseAuth.createUserWithEmailAndPassword(usernme,passwd).addOnCompleteListener(RegisterActivity.this,
                         new OnCompleteListener<AuthResult>() {
                     @Override
                     public void onComplete(@NonNull Task<AuthResult> task) {
                   if(task.isSuccessful()){
                       Toast.makeText(RegisterActivity.this, "Registered Successfully", Toast.LENGTH_SHORT).show();
                       }
                       else{
                       System.out.println(task.getException().getMessage());
                       Toast.makeText(RegisterActivity.this,
                               "Reg unsuccessful: " + task.getException().getMessage(), //ADD THIS
                               Toast.LENGTH_SHORT).show();
                       messagerr.setText(task.getException().getMessage());
                       messagerr.setVisibility(View.VISIBLE);
                   }
                     }
                 });


             }



         }
     });
    }
}
