pipeline{

    agent any

    stages{
        stage("build"){
            steps{
                echo "========executing BUILD========"
            }

        }
        stage("test"){
            steps{
                echo "========executing TEST========"
            }

        }
        stage("deploy"){
            steps{
                echo "========executing DEPLOY========"
            }

        }
    }
    post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}