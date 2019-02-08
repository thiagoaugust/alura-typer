var tempoInicial = $("#contador-digitacao").text();
var campo = $("#campo-digitacao");

$(document).ready(function(){
	atualizarTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	$("#botao-reiniciar").click(reiniciaJogo);
});	


function atualizarTamanhoFrase(){
	var frase = $(".frase").text();
	var tamanhoFrase = frase.split(" ").length;
	$("#tamanho-frase").text(tamanhoFrase);
}

function inicializaContadores(){
	
	campo.on("input",function(){
		var conteudo = campo.val();
		var qtdePalavras = conteudo.split(/\S+/).length-1;
		$("#contador-palavras").text(qtdePalavras);

		var qtdeCaracteres = conteudo.length;
		$("#contador-caracteres").text(qtdeCaracteres);
	});
}


function inicializaCronometro(){
	var tempoRestante = $("#contador-digitacao").text();
	campo.one("focus",function(){
		var idContador = setInterval(function(){
			tempoRestante--;
			$("#contador-digitacao").text(tempoRestante);
			if(tempoRestante<1){
				campo.attr("disabled",true);
				campo.addClass("campo-desativado");
				clearInterval(idContador);
				console.log(tempoRestante);
			}
		},1000)
	});
}

function reiniciaJogo(){
	campo.removeClass("campo-desativado");
	campo.val("");
	campo.attr("disabled",false);
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
	$("#contador-digitacao").text(tempoInicial);
	inicializaCronometro();
}

