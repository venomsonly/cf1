pipeline { 
    agent any          

    stages{ 
        stage("one"){ 
            steps{ 
                sh """
                echo "Step 1 of main"
                """ 
            } 
        } 
        stage("two"){ 
            steps{ 
                 echo 'step 2' 
                 sleep 5
                 yarn install
                 yarn build
                 
            } 
        } 
        stage("three"){ 
            steps{ 
                 echo 'step 3' 
            } 
        } 
    }        
    post{         

        always{      

             echo 'This pipeline is completed.' 
        } 
    } 
}
