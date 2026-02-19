/**
 * CDI Widget Module for AngularJS
 * Main module definition and configuration
 */
angular.module('cdiWidget', [])
    .constant('CDI_CONFIG', {
        DEFAULT_LANGUAGE: 'es',
        POLLING_INTERVAL: 2500,
        STATUSES: {
            en: [
                "Normal", "Alarm", "Alarm", "Pre-alarm", "Technical alarm", "Fault", 
                "Line open", "Line in short circuit", "Disabled", "Manual Download Button MDB", 
                "Acknowledge", "Reset", "Abort", "System initialized", "Silence siren", 
                "Low battery", "Full battery", "Power failure", "Power OK", "Robbery"
            ],
            es: [
                "Normal", "Alarma", "Alarma", "Pre alarma", "Alarma Tecnica", "Falla", 
                "Linea abierta", "Linea en corto", "Excluida", "Pulsador de Descarga Manual PDM", 
                "Aceptacion", "Reset", "Aborto", "Sistema inicializado", "Silenciar sirena", 
                "Bateria baja", "Bateria completa", "Falla alimentacion", "Alimentacion OK", "Robo"
            ],
            pt: [
                "Normal", "Alarme", "Alarme", "Pré-alarme", "Alarme Técnico", "Falha", 
                "Linha aberta", "Linha curta", "Excluído", "Botão de download manual do PDM", 
                "Aceitação", "Reiniciar", "Aborto", "Sistema inicializado", "Silêncio sirene", 
                "Bateria Fraca", "Bateria cheia", "Falha de alimentação", "Alimentação OK", "Roubo"
            ]
        }
    })
    .config(['$httpProvider', function($httpProvider) {
        // Add any global HTTP configuration here
    }]);
