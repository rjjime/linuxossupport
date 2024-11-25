pipeline {
    agent { label 'docker-agent' } // Specify the Docker agent node

    environment {
        NODE_HOME = '/usr/local/bin/node'
        COMPOSER_HOME = '/home/jenkins'
        PATH = "/home/jenkins:$PATH" // Ensure Composer is globally available
//        PATH = "/usr/local/bin:/usr/bin:/path/to/npm:$PATH"  // Adjust path if necessary

    }
    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir() // Deletes workspace content
            }
        }

        stage('Install Composer') {
            steps {
                echo 'Installing composer...'
                // Install Composer if not already present
                sh 'curl -sS https://getcomposer.org/installer | php -- --install-dir=/home/jenkins --filename=composer'
            }
        }
        stage('Checkout') {
            steps {
                echo 'Checking out the source code...'
		retry(3) {
                    checkout scm
		}
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project...'
                // Add build commands here
                sh 'composer install'
//                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add test commands here
//                sh 'npm test'
//                sh 'phpunit tests/'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying to staging/production...'
                // Add deployment commands here
            }
        }
    }
}
